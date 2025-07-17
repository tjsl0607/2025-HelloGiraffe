# Git Push 오류 해결: 로컬과 원격 저장소의 충돌 다루기

## 배경:
GitHub에 새로운 저장소를 만들고, 로컬에서 프로젝트를 만듦.
로컬에서 파일을 추가하고 커밋한 후, 원격 저장소에 푸시하려 함.
원격 저장소에 이미 초기 커밋(README.md)이 있어서 충돌 발생.
> git clone(remote+pull) 대신 git remote를 써서.

## 발생한 오류와 시도 과정

### 1. 파일 추가와 커밋
```text
$ git add .
(여러 파일의 LF/CRLF 경고 발생: Windows와 Git의 줄바꿈 처리 차이 때문에 나오는 거라 중요 X.)
$ git commit -m "Feat: 폴더 구조 생성 및 불필요한 파일 제거"
[main (root-commit) 80e8378] ...
```
- 문제 없음: 여기까진 순조로웠음.

### 2. 첫 푸시 시도
``` text
$ git push -u origin main
! [rejected] main -> main (fetch first)
error: failed to push some refs...
hint: Updates were rejected because the remote contains work that you do not have locally.
```
- 오류 원인: 원격 저장소에 로컬에 없는 커밋(아마 GitHub에서 자동 생성된 초기 커밋: Read me)이 있어서 푸시가 거부됨. Git은 "먼저 pull 해서 병합해!"라고 조언.

- 시도: -u 옵션으로 upstream을 설정하려 했지만, 실패.

### 3. Pull 시도와 트래킹 정보 없음
``` text
$ git pull
... (객체 다운로드)
There is no tracking information for the current branch.
Please specify which branch you want to merge with.
```
- 오류 원인: 로컬 main 브랜치가 원격 origin/main을 추적(tracking)하지 않아서 pull이 제대로 안 됨.

- 해결 시도: Git의 힌트를 따라 upstream 설정.

``` text
$ git branch --set-upstream-to=origin/main main
branch 'main' set up to track 'origin/main'.
```

### 4. 다시 푸시 시도
``` text
$ git push
! [rejected] main -> main (non-fast-forward)
error: failed to push some refs...
hint: Updates were rejected because the tip of your current branch is behind its remote counterpart.
```
- 오류 원인: 이제 트래킹은 됐지만, 로컬 브랜치가 원격보다 뒤처져 있음. (원격에 추가 커밋 있음) 다시 pull 하라는 힌트.

### 5. Pull 재시도와 "unrelated histories" 오류
```text
$ git pull
fatal: refusing to merge unrelated histories
```
- 오류 원인: 로컬과 원격의 커밋 히스토리가 완전히 다르기 때문에(로컬은 독립적으로 초기화, 원격은 GitHub 초기 커밋), Git이 병합을 거부. 이는 로컬과 원격이 "관련 없는 역사"로 보일 때 발생.

- 추가 시도: git pull origin main도 같은 오류.

### 6. 로그 확인과 Fetch
``` text
$ git log
commit 80e8378... (로컬 커밋 보여줌)
$ git fetch --all
```
(원격 브랜치 업데이트)
목적: 로컬 커밋을 확인하고, 원격 상태를 최신화. 하지만 여전히 pull 실패

### 최종 해결: Hard Reset으로 로컬 초기화
``` text
$ git reset --hard origin/main
HEAD is now at c6f9174 Initial commit
$ git pull origin main
Already up to date.
```
#### 어떻게 해결됐나? 
```git reset --hard origin/main```으로 로컬 브랜치를 원격 main 브랜치의 상태로 강제 초기화했어요. 이로 인해 로컬의 기존 커밋(80e8378)이 사라지고, 원격의 초기 커밋(c6f9174)으로 맞춰짐.

주의점: 이 명령어는 로컬 변경을 완전히 삭제, 중요한 작업이 있다면 백업해야함! (... 백업을 안해서 다 날라감.)

### 더 나은 접근법과 교훈
이 오류는 로컬과 원격이 독립적으로 초기화될 때 자주 발생함. 
#### 예방 팁
- 저장소 생성 시: GitHub에서 빈 저장소로 만들거나, 로컬에서 git init 후 바로 git remote add origin 하고 pull부터 하기(=git clone 쓰기).

- 항상 git status와 git log로 상태 확인.

- 푸시 전에 git pull 습관화.

- 브랜치 트래킹은 git push -u가 성공할 때 자동 설정되니, 초기에는 git pull origin main부터.