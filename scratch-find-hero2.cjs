const fs = require('fs');
const lines = fs.readFileSync('/Users/marktheguy/.gemini/antigravity-ide/brain/74353286-d8fb-489d-aa33-ba36761755e9/.system_generated/logs/transcript.jsonl', 'utf8').split('\n');

let foundAny = false;
for (const line of lines) {
    if (!line) continue;
    const data = JSON.parse(line);
    if (data.type === 'PLANNER_RESPONSE' && data.tool_calls) {
        for (const tc of data.tool_calls) {
            if (tc.name === 'write_to_file' || tc.name === 'multi_replace_file_content' || tc.name === 'replace_file_content') {
                if (tc.args && typeof tc.args.CodeContent === 'string' && tc.args.CodeContent.includes('Swiper') && tc.args.CodeContent.includes('bg-white')) {
                     fs.appendFileSync('hero-history2.txt', `Step ${data.step_index}:\n` + tc.args.CodeContent.substring(0, 1000) + '\n\n');
                     foundAny = true;
                }
            }
        }
    }
}
if (!foundAny) fs.writeFileSync('hero-history2.txt', 'No history found\n');
