import UIKit

struct PDFGenerator {

    // MARK: - Page constants
    static let pageWidth:    CGFloat = 595.2
    static let pageHeight:   CGFloat = 841.8
    static let margin:       CGFloat = 52.0
    static let inset:        CGFloat = 14.0
    static var contentWidth: CGFloat { pageWidth - margin * 2 }

    // MARK: - Fonts
    static let coverTitleFont  = UIFont.systemFont(ofSize: 30, weight: .bold)
    static let coverSubFont    = UIFont.systemFont(ofSize: 14, weight: .regular)
    static let qNumFont        = UIFont.monospacedDigitSystemFont(ofSize: 11, weight: .bold)
    static let qCatFont        = UIFont.systemFont(ofSize: 9,  weight: .semibold)
    static let qTextFont       = UIFont.systemFont(ofSize: 13, weight: .semibold)
    static let labelFont       = UIFont.systemFont(ofSize: 9,  weight: .bold)
    static let answerFont      = UIFont.systemFont(ofSize: 11, weight: .regular)
    static let fqQFont         = UIFont.systemFont(ofSize: 10, weight: .semibold)
    static let fqAFont         = UIFont.systemFont(ofSize: 10, weight: .regular)
    static let pageNumFont     = UIFont.systemFont(ofSize: 8,  weight: .regular)

    // MARK: - Colors
    static let accentColor  = UIColor.systemBlue
    static let redColor     = UIColor.systemRed
    static let greenColor   = UIColor(red: 0.18, green: 0.55, blue: 0.34, alpha: 1)
    static let grayText     = UIColor.secondaryLabel
    static let bodyText     = UIColor.label

    // MARK: - Entry point
    static func generate(questions: [Question], isKorean: Bool) -> Data {
        let pageRect = CGRect(x: 0, y: 0, width: pageWidth, height: pageHeight)
        let renderer = UIGraphicsPDFRenderer(bounds: pageRect)

        return renderer.pdfData { ctx in
            // ── Cover ──
            ctx.beginPage()
            drawCover(isKorean: isKorean)

            // ── Questions ──
            var y: CGFloat = margin
            ctx.beginPage()

            for (idx, q) in questions.enumerated() {
                y = drawQuestion(q, y: &y, ctx: ctx, isKorean: isKorean)

                if idx < questions.count - 1 {
                    if y + 100 > pageHeight - margin {
                        ctx.beginPage()
                        y = margin
                    } else {
                        drawHRule(y: y)
                        y += 18
                    }
                }
            }
        }
    }

    // MARK: - Cover page
    private static func drawCover(isKorean: Bool) {
        let title    = isKorean ? "기술 면접 훈련 100" : "Tech Interview Training 100"
        let subtitle = isKorean
            ? "암기가 아닌 이해를 위한 5단계 기술 면접 훈련"
            : "5-Stage Training for Real Understanding"
        let stages   = isKorean
            ? "백지 소환  →  모범답안  →  자가 판정  →  꼬리 질문  →  오개념 찾기"
            : "Blank Recall  →  Model Answer  →  Self Assessment  →  Follow-ups  →  Spot Mistake"

        // Blue banner
        let bannerRect = CGRect(x: 0, y: pageHeight / 2 - 130, width: pageWidth, height: 8)
        accentColor.withAlphaComponent(0.15).setFill()
        UIBezierPath(rect: bannerRect).fill()

        var y = pageHeight / 2 - 110

        // Title
        let titleAttr = NSAttributedString(string: title, attributes: [
            .font: coverTitleFont,
            .foregroundColor: accentColor
        ])
        let titleH = boundingH(titleAttr, width: contentWidth)
        titleAttr.draw(in: CGRect(x: margin, y: y, width: contentWidth, height: titleH))
        y += titleH + 14

        // Subtitle
        let subAttr = NSAttributedString(string: subtitle, attributes: [
            .font: coverSubFont,
            .foregroundColor: grayText
        ])
        let subH = boundingH(subAttr, width: contentWidth)
        subAttr.draw(in: CGRect(x: margin, y: y, width: contentWidth, height: subH))
        y += subH + 24

        // Stages
        let stagesAttr = NSAttributedString(string: stages, attributes: [
            .font: UIFont.systemFont(ofSize: 10, weight: .medium),
            .foregroundColor: grayText
        ])
        let stagesH = boundingH(stagesAttr, width: contentWidth)
        stagesAttr.draw(in: CGRect(x: margin, y: y, width: contentWidth, height: stagesH))

        // Footer
        let footerAttr = NSAttributedString(string: "100 Questions", attributes: [
            .font: UIFont.systemFont(ofSize: 9),
            .foregroundColor: UIColor.tertiaryLabel
        ])
        footerAttr.draw(at: CGPoint(x: margin, y: pageHeight - margin - 16))
    }

    // MARK: - Draw one question, returns new Y
    @discardableResult
    private static func drawQuestion(
        _ q: Question,
        y: inout CGFloat,
        ctx: UIGraphicsPDFRendererContext,
        isKorean: Bool
    ) -> CGFloat {

        // ── Header: number + category ──
        checkBreak(y: &y, needed: 40, ctx: ctx)
        let numAttr = NSAttributedString(string: String(format: "%02d", q.id), attributes: [
            .font: qNumFont, .foregroundColor: accentColor
        ])
        numAttr.draw(at: CGPoint(x: margin, y: y))

        let catAttr = NSAttributedString(string: "  ·  \(q.cat)", attributes: [
            .font: qCatFont, .foregroundColor: grayText
        ])
        catAttr.draw(at: CGPoint(x: margin + 26, y: y + 1))
        y += 18

        // ── Question text ──
        let qAttr = NSAttributedString(string: stripHTML(q.q), attributes: [
            .font: qTextFont, .foregroundColor: bodyText
        ])
        drawBlock(qAttr, y: &y, ctx: ctx)
        y += 8

        // ── Answer ──
        drawLabel(isKorean ? "▶ 모범답안" : "▶ Model Answer", color: accentColor, y: &y, ctx: ctx)
        let ansAttr = NSAttributedString(string: stripHTML(q.a), attributes: [
            .font: answerFont,
            .foregroundColor: UIColor.darkGray,
            .paragraphStyle: paragraphStyle(lineSpacing: 3)
        ])
        drawBlock(ansAttr, y: &y, ctx: ctx, inset: inset)

        // ── Study links ──
        if !q.links.isEmpty {
            let linksText = q.links.map { "↗ \($0.t)" }.joined(separator: "   ")
            let linksAttr = NSAttributedString(string: linksText, attributes: [
                .font: UIFont.systemFont(ofSize: 9),
                .foregroundColor: accentColor
            ])
            drawBlock(linksAttr, y: &y, ctx: ctx, inset: inset)
        }
        y += 6

        // ── Follow-up questions ──
        if !q.fqs.isEmpty {
            drawLabel(isKorean ? "▶ 꼬리 질문" : "▶ Follow-up Questions", color: accentColor, y: &y, ctx: ctx)
            for (i, fq) in q.fqs.enumerated() {
                let prefix = "\(i + 1). "
                let fqQAttr = NSAttributedString(string: prefix + stripHTML(fq.q), attributes: [
                    .font: fqQFont, .foregroundColor: bodyText
                ])
                drawBlock(fqQAttr, y: &y, ctx: ctx, inset: inset)

                let fqAAttr = NSAttributedString(string: stripHTML(fq.a), attributes: [
                    .font: fqAFont,
                    .foregroundColor: UIColor.darkGray,
                    .paragraphStyle: paragraphStyle(lineSpacing: 2)
                ])
                drawBlock(fqAAttr, y: &y, ctx: ctx, inset: inset + 12)
                y += 4
            }
            y += 4
        }

        // ── Trap question ──
        drawLabel(
            isKorean ? "▶ 오개념 찾기" : "▶ Spot the Misconception",
            color: redColor, y: &y, ctx: ctx
        )

        // Wrong statement box
        let wrongAttr = NSAttributedString(string: "✗  " + stripHTML(q.trap.wrong), attributes: [
            .font: fqAFont, .foregroundColor: redColor
        ])
        drawHighlightedBlock(wrongAttr, bgColor: UIColor.systemRed.withAlphaComponent(0.07),
                             borderColor: UIColor.systemRed.withAlphaComponent(0.25),
                             y: &y, ctx: ctx)
        y += 5

        // Explanation box
        let explainAttr = NSAttributedString(string: "✓  " + stripHTML(q.trap.explain), attributes: [
            .font: fqAFont, .foregroundColor: greenColor
        ])
        drawHighlightedBlock(explainAttr, bgColor: UIColor.systemGreen.withAlphaComponent(0.07),
                             borderColor: UIColor.systemGreen.withAlphaComponent(0.25),
                             y: &y, ctx: ctx)

        return y
    }

    // MARK: - Drawing helpers

    private static func drawLabel(_ text: String, color: UIColor, y: inout CGFloat, ctx: UIGraphicsPDFRendererContext) {
        let attr = NSAttributedString(string: text, attributes: [
            .font: labelFont, .foregroundColor: color
        ])
        checkBreak(y: &y, needed: 20, ctx: ctx)
        attr.draw(at: CGPoint(x: margin, y: y))
        y += 16
    }

    private static func drawBlock(
        _ attr: NSAttributedString,
        y: inout CGFloat,
        ctx: UIGraphicsPDFRendererContext,
        inset: CGFloat = 0
    ) {
        let w = contentWidth - inset
        let h = boundingH(attr, width: w) + 2
        checkBreak(y: &y, needed: h, ctx: ctx)
        attr.draw(in: CGRect(x: margin + inset, y: y, width: w, height: h))
        y += h + 2
    }

    private static func drawHighlightedBlock(
        _ attr: NSAttributedString,
        bgColor: UIColor,
        borderColor: UIColor,
        y: inout CGFloat,
        ctx: UIGraphicsPDFRendererContext
    ) {
        let w = contentWidth
        let textH = boundingH(attr, width: w - 20) + 2
        let boxH = textH + 12
        checkBreak(y: &y, needed: boxH, ctx: ctx)

        let boxRect = CGRect(x: margin, y: y, width: w, height: boxH)
        let path = UIBezierPath(roundedRect: boxRect, cornerRadius: 4)
        bgColor.setFill()
        path.fill()
        borderColor.setStroke()
        path.lineWidth = 0.5
        path.stroke()

        attr.draw(in: CGRect(x: margin + 10, y: y + 6, width: w - 20, height: textH))
        y += boxH + 4
    }

    private static func drawHRule(y: CGFloat) {
        UIColor.systemGray4.setStroke()
        let path = UIBezierPath()
        path.move(to: CGPoint(x: margin, y: y))
        path.addLine(to: CGPoint(x: pageWidth - margin, y: y))
        path.lineWidth = 0.5
        path.stroke()
    }

    private static func checkBreak(y: inout CGFloat, needed: CGFloat, ctx: UIGraphicsPDFRendererContext) {
        if y + needed > pageHeight - margin {
            ctx.beginPage()
            y = margin
        }
    }

    // MARK: - Utilities

    static func stripHTML(_ html: String) -> String {
        var text = html
        text = text.replacingOccurrences(of: "<[^>]+>", with: "", options: .regularExpression)
        text = text.replacingOccurrences(of: "&lt;",   with: "<")
        text = text.replacingOccurrences(of: "&gt;",   with: ">")
        text = text.replacingOccurrences(of: "&amp;",  with: "&")
        text = text.replacingOccurrences(of: "&nbsp;", with: " ")
        return text.trimmingCharacters(in: .whitespacesAndNewlines)
    }

    private static func boundingH(_ attr: NSAttributedString, width: CGFloat) -> CGFloat {
        let rect = attr.boundingRect(
            with: CGSize(width: width, height: .greatestFiniteMagnitude),
            options: [.usesLineFragmentOrigin, .usesFontLeading],
            context: nil
        )
        return ceil(rect.height)
    }

    private static func paragraphStyle(lineSpacing: CGFloat) -> NSParagraphStyle {
        let ps = NSMutableParagraphStyle()
        ps.lineSpacing = lineSpacing
        return ps
    }
}
