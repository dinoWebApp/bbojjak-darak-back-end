const CHANGELOG_DATA = [
  {
    date: '2025-07-25',
    version: '0.0.1`',
    changes: ['초기 세팅'],
  },
];

export function generateChangelogMarkdown(): string {
  let markdown = '## 📝 수정사항 (Changelog)\n\n';
  markdown += '| 날짜 | 버전 | 내용 |\n';
  markdown += '|:---|:---|:---|\n';
  CHANGELOG_DATA.forEach((entry) => {
    // 마크다운 테이블 셀 안에서 줄바꿈을 위해 <br> 태그를 사용합니다.
    const changesText = entry.changes.join('<br>');
    markdown += `| ${entry.date} | ${entry.version} | ${changesText} |\n`;
  });
  return markdown;
}
