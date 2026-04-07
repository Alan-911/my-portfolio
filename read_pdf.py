import sys

def read_pdf(file_path):
    try:
        import PyPDF2
        with open(file_path, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            text = ""
            for page in reader.pages:
                text += page.extract_text() + "\n"
        with open("pdf_content.txt", "w", encoding="utf-8") as out:
            out.write(text)
        return
    except ImportError:
        pass
        
    print("No compatible PDF reading library found (tried PyPDF2).")

if __name__ == '__main__':
    read_pdf('Agentic-Portfolio-Implementation-Plan_2.pdf')
