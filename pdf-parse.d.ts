// pdf-parse.d.ts
declare module 'pdf-parse' {
    interface PDFData {
        text: string;
        numpages: number;
        info: Record<string, unknown>;
        metadata: unknown;
    }

    function pdfParse(data: Buffer | Uint8Array): Promise<PDFData>;
    export default pdfParse;
}