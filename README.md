# Example

```yml
name: Check PR description
 on:
   pull_request:
     types: [edited, opened, reopened, synchronize]
     branches: [master]
 jobs:
   check:
     runs-on: ubuntu-latest
     steps:
       - uses: actions/checkout@v2
       - name: Check PR description
         uses: clearbit/check-PR-description-action@v1.0
         with:
           PR_TEMPLATE_PATH: 'pull_request_template.md'
           GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```