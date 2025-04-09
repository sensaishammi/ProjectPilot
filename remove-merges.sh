#!/bin/bash

# Get the list of merge commits
merge_commits=$(git log --merges --format="%H")

# For each merge commit, rebase to remove it
for commit in $merge_commits; do
    git rebase --onto $commit^ $commit main
done

# Force push the changes
git push origin main --force 