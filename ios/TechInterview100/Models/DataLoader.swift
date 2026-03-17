import Foundation

enum DataLoader {
    static let questionsKO: [Question] = load("questions_ko")
    static let questionsEN: [Question] = load("questions_en")

    private static func load<T: Decodable>(_ filename: String) -> [T] {
        guard let url = Bundle.main.url(forResource: filename, withExtension: "json"),
              let data = try? Data(contentsOf: url),
              let value = try? JSONDecoder().decode([T].self, from: data)
        else {
            print("Failed to load \(filename).json")
            return []
        }
        return value
    }
}
