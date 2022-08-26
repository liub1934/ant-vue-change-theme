#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
yarn build

# cd 到构建输出的目录下
cd dist

git init
git add -A
git commit -m 'deploy'

git config --local user.name "liub1934"
git config --local user.email "liub1934@gmail.com"

# 部署到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:liub1934/ant-vue-change-theme.git master:gh-pages

cd -