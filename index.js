const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const githubToken = core.getInput('GITHUB_TOKEN');
    const templatePath = core.getInput('PR_TEMPLATE_PATH');
    const octokit = github.getOctokit(githubToken);
    const prTemplate = (await octokit.repos.getContent({
      owner: github.context.payload.pull_request.base.repo.owner.login,
      repo: github.context.payload.pull_request.base.repo.name,
      path: templatePath,
    })).data.content;

    const description = github.context.payload.pull_request.body
      .replace(/(?:\\[rn]|[\r\n]+)+/g, "");
      
    const templateContent = (new Buffer.from(prTemplate, 'base64'))
      .toString('utf-8')
      .replace(/(?:\\[rn]|[\r\n]+)+/g, "");
    
    if(description == "") {
      core.setFailed('PR Description is empty, please provide one.')
    }
    else if(templateContent == description) {
      core.setFailed('Please fill in the PR description template.')
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}
run();