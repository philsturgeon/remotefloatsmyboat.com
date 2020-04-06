const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const reasonsFile = path.join(__dirname, `/data/reasons.yaml`)
const templateFile = path.join(__dirname, `/index.html.tpl`)
const publicFile = path.join(__dirname, `../public/index.html`)

const reasonsData = yaml.load(fs.readFileSync(reasonsFile, 'utf8'));
const templateHtml = fs.readFileSync(templateFile,'utf8');

reasonsList = reasonsData.map(reason => `
<li>
  <p>
    ${reason.icon} ${reason.reason} - 
    <small>by
    ${reason.source_name
      ? `<a href="${reason.source_link}">${reason.source_name}</a>`
      : reason.source_name
    }
    ${reason.link && `<em><a href="${reason.link}">(over here)</a></em>`}&nbsp;
    </small>
  </p>
</li>
`);

let newHtml = templateHtml;

newHtml = newHtml.replace(
  '{REASON-LIST}',
  `<ul>${reasonsList.join('\n')}</ul>`
);

// TODO pull in climate actions in job category with remote tag from protect earth
// newHtml = newHtml.replace(
//   '{CLIMATE-JOB-LIST}',
//   `<ul>Protect Earth stuff</ul>`
// );

fs.writeFileSync(publicFile, newHtml, 'utf8');
