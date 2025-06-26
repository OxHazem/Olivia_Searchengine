@echo off
echo Compiling search engine logo...
xelatex search_engine_logo.tex
echo Converting logo to PNG...
convert -density 300 search_engine_logo.pdf search_engine_logo.png

echo Compiling main document...
xelatex search_engine_documentation.tex
xelatex search_engine_documentation.tex

echo Cleaning up temporary files...
del *.aux *.log *.out *.synctex.gz

echo Done! The documentation is ready in search_engine_documentation.pdf 