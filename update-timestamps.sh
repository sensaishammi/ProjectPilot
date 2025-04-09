#!/bin/bash

# Get the current date
current_date=$(date -R)

# Calculate dates for 3 weeks ago
three_weeks_ago=$(date -v-3w -R)

# Create a temporary file for the filter-branch command
cat > /tmp/update-timestamps.sh << 'EOF'
#!/bin/bash

# Get the commit date
commit_date=$(git show -s --format=%ci $GIT_COMMIT)

# Calculate a random number of days between 0 and 21 (3 weeks)
random_days=$((RANDOM % 22))

# Calculate the new date (3 weeks ago + random days)
new_date=$(date -v-3w -v+"$random_days"d -R)

# Set the new date
export GIT_AUTHOR_DATE="$new_date"
export GIT_COMMITTER_DATE="$new_date"
EOF

chmod +x /tmp/update-timestamps.sh

# Run git filter-branch
git filter-branch -f --env-filter 'source /tmp/update-timestamps.sh' -- --all

# Clean up
rm /tmp/update-timestamps.sh 