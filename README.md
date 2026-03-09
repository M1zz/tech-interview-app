# 기술 면접 훈련 100

암기가 아닌 **이해**를 위한 기술 면접 훈련 앱입니다.

## 5단계 이해 검증 시스템

1. **백지 소환** — 답을 보기 전에 직접 써보기
2. **모범답안 확인** — 정리된 답안과 비교
3. **자가 판정** — 이해도 솔직하게 평가
4. **꼬리 질문** — 심화 질문 2개로 깊이 확인
5. **오개념 찾기** — 틀린 설명에서 오류 발견

## 카테고리 (100문제)

| 카테고리 | 문항 수 |
|---|---|
| 알고리즘 | 15문제 |
| 자료구조 | 13문제 |
| 데이터베이스 | 15문제 |
| 네트워크 | 13문제 |
| 운영체제 | 10문제 |
| OOP/패턴 | 13문제 |
| 웹/프론트 | 10문제 |
| 시스템설계 | 11문제 |

## 배포 (GitHub Pages)

**라이브**: https://m1zz.github.io/tech-interview-app

```bash
git init
git add .
git commit -m "init: 기술 면접 훈련 100"
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

GitHub 레포 → Settings → Pages → Source: **main branch / (root)**

## 로컬 실행

```bash
# Python
python3 -m http.server 8080

# Node
npx serve .
```

브라우저에서 `http://localhost:8080` 접속
