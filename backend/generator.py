import os
import json
import tempfile
from dotenv import load_dotenv
from groq import Groq
from fastapi.responses import FileResponse
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from docx import Document
from fpdf import FPDF

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

THEMES = {
    "dark":   {"bg": (18, 18, 18),   "title": (0, 212, 255),   "text": (255, 255, 255)},
    "blue":   {"bg": (10, 25, 60),   "title": (100, 180, 255), "text": (220, 235, 255)},
    "green":  {"bg": (10, 40, 20),   "title": (0, 230, 120),   "text": (200, 255, 220)},
    "purple": {"bg": (30, 10, 60),   "title": (200, 100, 255), "text": (240, 220, 255)},
    "light":  {"bg": (245, 245, 245),"title": (30, 30, 30),    "text": (60, 60, 60)},
}

def get_ai_content(topic: str, slide_count: int):
    prompt = f"""
Create a {slide_count}-slide presentation on: {topic}

Return ONLY a JSON array like this (no extra text):
[
  {{"title": "Slide Title", "points": ["point 1", "point 2", "point 3"]}},
  ...
]
"""
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
    )
    raw = response.choices[0].message.content.strip()
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    return json.loads(raw.strip())


async def generate_ppt(req):
    slides_data = get_ai_content(req.topic, req.slide_count)
    theme = THEMES.get(req.theme, THEMES["dark"])

    prs = Presentation()
    prs.slide_width  = Inches(13.33)
    prs.slide_height = Inches(7.5)

    for slide_info in slides_data:
        slide = prs.slides.add_slide(prs.slide_layouts[6])
        bg = slide.background.fill
        bg.solid()
        bg.fore_color.rgb = RGBColor(*theme["bg"])

        title_box = slide.shapes.add_textbox(Inches(0.5), Inches(0.4), Inches(12), Inches(1.2))
        tf = title_box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = slide_info["title"]
        p.runs[0].font.size = Pt(36)
        p.runs[0].font.bold = True
        p.runs[0].font.color.rgb = RGBColor(*theme["title"])

        content_box = slide.shapes.add_textbox(Inches(0.5), Inches(1.8), Inches(12), Inches(5))
        tf2 = content_box.text_frame
        tf2.word_wrap = True
        for point in slide_info["points"]:
            p2 = tf2.add_paragraph()
            p2.text = f"- {point}"
            p2.runs[0].font.size = Pt(20)
            p2.runs[0].font.color.rgb = RGBColor(*theme["text"])
            p2.space_after = Pt(8)

    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".pptx")
    prs.save(tmp.name)
    return FileResponse(
        tmp.name,
        media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation",
        filename=f"{req.topic}.pptx"
    )


async def generate_doc(req):
    slides_data = get_ai_content(req.topic, req.slide_count)

    doc = Document()
    doc.add_heading(req.topic, 0)
    for slide_info in slides_data:
        doc.add_heading(slide_info["title"], level=1)
        for point in slide_info["points"]:
            doc.add_paragraph(f"- {point}")
        doc.add_paragraph("")

    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".docx")
    doc.save(tmp.name)
    return FileResponse(
        tmp.name,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        filename=f"{req.topic}.docx"
    )


async def generate_pdf(req):
    slides_data = get_ai_content(req.topic, req.slide_count)
    theme = THEMES.get(req.theme, THEMES["dark"])

    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)

    for slide_info in slides_data:
        pdf.add_page()
        r, g, b = theme["bg"]
        pdf.set_fill_color(r, g, b)
        pdf.rect(0, 0, 210, 297, "F")

        tr, tg, tb = theme["title"]
        pdf.set_text_color(tr, tg, tb)
        pdf.set_font("Helvetica", "B", 22)
        pdf.set_xy(10, 15)
        pdf.multi_cell(190, 10, slide_info["title"])

        cr, cg, cb = theme["text"]
        pdf.set_text_color(cr, cg, cb)
        pdf.set_font("Helvetica", "", 14)
        for point in slide_info["points"]:
            pdf.set_x(15)
            pdf.multi_cell(180, 8, f"- {point}")
            pdf.ln(2)

    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".pdf")
    pdf.output(tmp.name)
    return FileResponse(
        tmp.name,
        media_type="application/pdf",
        filename=f"{req.topic}.pdf"
    )