#!/bin/bash
echo "Ukládám rozdělanou práci..."
git stash

echo "Odstraňuji ducky-bg.psd z git historie..."
FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch public/ducky-bg.psd' \
  --prune-empty --tag-name-filter cat -- --all

echo "Čistím staré reference..."
git for-each-ref --format='delete %(refname)' refs/original | git update-ref --stdin
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo "Obnovuji rozdělanou práci..."
git stash pop

echo "Pushuju (force)..."
git push origin main --force
echo "Hotovo!"
