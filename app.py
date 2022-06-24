from flask import Flask, render_template
from markupsafe import escape

app = Flask(__name__)

@app.route("/", defaults={"path": ""}) # single page application
@app.route("/<path:path>") # routes all urls and children urls to the same page.
def catch_all(path):
    return render_template("index.html")
    
#@app.route("/<dynamic_url>")
#def dynamic_page(dynamic_url):
#    return f"Hello, {escape(dynamic_url)}!" # "escape()" escapes the input, rendering it effective only as a piece of text - prevents it from being used to inject malicious code.