const mdContainer = require('markdown-it-container');
const fs = require('fs');
module.exports = options => {
  const {
    component = 'demo-block'
  } = options;
  const componentName = component
    .replace(/^\S/, s => s.toLowerCase())
    .replace(/([A-Z])/g, "-$1").toLowerCase();
  return md => {
    md.use(mdContainer, 'demo', {
      validate(params) {
        return params.trim().match(/^demo\s*(.*)$/);
      },
      render(tokens, idx) {
        const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
        if (tokens[idx].nesting === 1) {
          const description = m && m.length > 1 ? m[1] : '';
          const nextToken = tokens[idx + 1]
          let content = nextToken.type === 'fence' ? nextToken.content : '';
          // 如果是import导入代码段, 读取文件内容
          const { type, src } = nextToken
          if (type === 'fence' && src) {
            const statInfo = fs.statSync(src);
            if (statInfo.isFile()) {
              content = fs.readFileSync(src, 'utf8')
            } else {
              console.error(`该文件不是一个文件类型:${src}`)
            }
          }
          const encodeOptionsStr = encodeURI(JSON.stringify(options));
          return `<${componentName} :options="JSON.parse(decodeURI('${encodeOptionsStr}'))">
            <template slot="demo"><!--pre-render-demo:${content}:pre-render-demo--></template>
            ${description ? `<div slot="description">${md.render(description).html}</div>` : ''}
            <template slot="source">
          `;
        }
        return `</template></${componentName}>`;
      }
    });
  };
}