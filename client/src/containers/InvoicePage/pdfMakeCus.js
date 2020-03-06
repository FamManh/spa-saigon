import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class pdfMakeCus {
    constructor(pageSize, pageMargins, styles, defaultStyle) {
        this.pageSize = pageSize;
        this.pageMargins = pageMargins;
        this.defaultStyle = defaultStyle
            ? defaultStyle
            : {
                  font: "dvs"
              };
        this.styles = styles;
    }

    async renderPDF(content, filename = "download", print = false) {
        pdfMake.fonts = {
            dvs: {
                normal: "DejaVuSansMono.ttf",
                bold: "DejaVuSansMono-Bold.ttf",
                italics: "DejaVuSansMono-Oblique.ttf",
                bolditalics: "DejaVuSansMono-BoldOblique.ttf"
            },
            time: {
                normal: "TimesNewRomanRegular.ttf",
                bold: "TimesNewRomanBold.ttf",
                italics: "TimesNewRomanItalic.ttf",
                bolditalics: "TimesNewRomanBoldItalic.ttf"
            },
            pt: {
                normal: "PTSansRegular.ttf",
                bold: "PTSansBold.ttf",
                italics: "PTSansItalic.ttf"
            },
            roboto: {
                normal: "Roboto-Regular.ttf",
                bold: "Roboto-Bold.ttf",
                italics: "Roboto-Light.ttf"
            }
        };
        let dd = {
            pageSize: this.pageSize,
            pageMargins: this.pageMargins,
            content,
            styles: this.styles,
            defaultStyle: this.defaultStyle
        };
        return pdfMake.createPdf(dd);
    }
}

export default pdfMakeCus;
