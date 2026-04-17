import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

with open('_new_consult.html', 'r', encoding='utf-8') as f:
    new_content = f.read()

start_marker = '<!-- ============================================================ -->\n<!-- \ud654\uba74 4: \uc0c1\ub2f4 \uc774\ub825 \uc870\ud68c'
end_marker = '</div><!-- /view-consult-detail -->'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker, start_idx)
if start_idx == -1 or end_idx == -1:
    print(f'ERROR: start={start_idx}, end={end_idx}')
else:
    end_idx += len(end_marker)
    new_html = content[:start_idx] + new_content + content[end_idx:]
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
    print(f'Replaced {end_idx - start_idx} chars starting at position {start_idx}')
    print('SUCCESS')
