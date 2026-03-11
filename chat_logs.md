1. Unzipped and organized the zip into docs/
Source: drive-download-20260311T002657Z-3-001.zip (56 .docx files).
Created: docs/ with 7 topic folders and a docs/README.md.
Folder	Purpose
ai-saas-smb	AI/SaaS, SMB, agentic AI, software investment
creator-economy	Creator economy, tools, platform gaps
collectibles	Collectibles market, alternative assets, AI grading
firebase	Firebase, Firestore, Auth, security, app hosting
cursor-ide	Cursor, Composer, prompting, IDE research
travel	AI travel, agentic travel, research summaries
summaries	Master/market summaries (Claude & Gemini), prompt docs
Renaming: All docs were given kebab-case names (e.g. creator-economy-matrix.docx, firebase-auth-deep-dive.docx). One duplicate Firebase storage doc was skipped.
2. Built master_context.md from every .docx
Goal: One file at the project root with concise, labeled summaries of every doc in docs/.
How:
Added extract-docx-summaries.ps1 that: opens each .docx as a ZIP, reads word/document.xml, pulls out text, strips filler, and keeps the first ~1,400 characters per doc.
Ran it on all 59 .docx files under docs/.
Output: master_context.md at the project root with:
A short intro
One ## <path/filename> section per doc and its key-point summary.
3. Put the same content into .cursorrules
Goal: Give Cursor that context in every chat in this project.
What we did: Copied master_context.md to .cursorrules at the project root so the doc summaries are always available as project rules.
Files created or changed
Item	Description
docs/	Folder with 7 subfolders and 56 renamed .docx files.
docs/README.md	Short description of the docs layout.
master_context.md	Single markdown file of labeled summaries (source: docs/ .docx).
.cursorrules	Same content as master_context.md for Cursor’s persistent context.
extract-docx-summaries.ps1	Script to re-run extraction if you add/change docs.
Overall: zip → organized docs/ → summarized into master_context.md → duplicated into .cursorrules so Cursor always has that context.