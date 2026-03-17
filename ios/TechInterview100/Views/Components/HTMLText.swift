import SwiftUI

/// Renders HTML content as styled text.
/// Converts <strong> → bold, <code> → monospace, strips other tags.
struct HTMLText: View {
    let html: String

    var body: some View {
        if let attr = try? AttributedString(
            markdown: markdownString,
            options: AttributedString.MarkdownParsingOptions(
                interpretedSyntax: .inlineOnlyPreservingWhitespace
            )
        ) {
            Text(attr)
                .fixedSize(horizontal: false, vertical: true)
        } else {
            Text(plainString)
                .fixedSize(horizontal: false, vertical: true)
        }
    }

    private var markdownString: String {
        var text = html
        // Bold
        text = text.replacingOccurrences(of: "<strong>", with: "**")
        text = text.replacingOccurrences(of: "</strong>", with: "**")
        // Code
        text = text.replacingOccurrences(of: "<code>", with: "`")
        text = text.replacingOccurrences(of: "</code>", with: "`")
        // Line breaks
        text = text.replacingOccurrences(of: "<br/>", with: "\n")
        text = text.replacingOccurrences(of: "<br>", with: "\n")
        // Strip remaining tags
        text = text.replacingOccurrences(of: "<[^>]+>", with: "", options: .regularExpression)
        // Decode HTML entities
        text = text.replacingOccurrences(of: "&lt;", with: "<")
        text = text.replacingOccurrences(of: "&gt;", with: ">")
        text = text.replacingOccurrences(of: "&amp;", with: "&")
        text = text.replacingOccurrences(of: "&nbsp;", with: " ")
        return text
    }

    private var plainString: String {
        html.replacingOccurrences(of: "<[^>]+>", with: "", options: .regularExpression)
    }
}
