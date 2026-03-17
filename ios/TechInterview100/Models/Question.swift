import Foundation

struct Question: Identifiable, Codable {
    let id: Int
    let cat: String
    let q: String
    let a: String
    let links: [StudyLink]
    let fqs: [FollowUp]
    let trap: TrapQuestion
}

struct StudyLink: Codable {
    let t: String
    let u: String
}

struct FollowUp: Codable {
    let q: String
    let a: String
}

struct TrapQuestion: Codable {
    let wrong: String
    let explain: String
}
