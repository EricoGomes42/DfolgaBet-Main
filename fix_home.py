import re

with open("src/pages/dfolgabet/DfolgaBetHome.tsx", "r") as f:
    content = f.read()

# Update queries
old_hero = r'const heroQuery = `\*\[_type == "post" && \(heroParticipation == true \|\| \(!defined\(sections\) \|\| "homepage" in sections\)\)\] \| order\(coalesce\(heroPriority, 999\) asc, publishedAt desc, _createdAt desc\)\[0\.\.\.10\] \{ primaryCategory, contentType, primaryCasinoOperator->\{slug\}, \.\.\., "categoryName": categories\[0\]->title, "authorName": author->name, "authorImage": author->image, promotedCategory, sections, area \}`;'
new_hero = 'const heroQuery = `*[_type == "post" && (heroParticipation == true || (!defined(sections) || "homepage" in sections))] | order(coalesce(heroPriority, 999) asc, publishedAt desc, _createdAt desc)[0...10] { _id, title, slug, mainImage, publishedAt, _createdAt, primaryCategory, contentType, primaryCasinoOperator->{slug}, casinoOperators[]->{slug, title}, sportCompetition->{slug, title}, sportEvent, bookmakerKey, "categoryName": categories[0]->title, "authorName": author->name, "authorImage": author->image, promotedCategory, sections, area }`;'
content = re.sub(old_hero, new_hero, content)

old_sports = r'const sportsQuery = `\*\[_type == "post" && \(area == "Esportes" \|\| promotedCategory == "sports" \|\| \(!defined\(sections\) \|\| "sports" in sections\) \|\| \(!defined\(area\) && !defined\(promotedCategory\) && \(!defined\(sections\) \|\| "homepage" in sections\)\)\)\] \| order\(publishedAt desc, _createdAt desc\)\[0\.\.\.12\] \{ primaryCategory, contentType, primaryCasinoOperator->\{slug\}, \.\.\., "categoryName": categories\[0\]->title, "authorName": author->name, "authorImage": author->image, promotedCategory, sections, area \}`;'
new_sports = 'const sportsQuery = `*[_type == "post" && (primaryCategory == "Esportes" || area == "Esportes" || promotedCategory == "sports" || (!defined(sections) || "sports" in sections) || (!defined(area) && !defined(primaryCategory) && !defined(promotedCategory) && (!defined(sections) || "homepage" in sections)))] | order(publishedAt desc, _createdAt desc)[0...12] { _id, title, slug, mainImage, publishedAt, _createdAt, primaryCategory, contentType, primaryCasinoOperator->{slug}, casinoOperators[]->{slug, title}, sportCompetition->{slug, title}, sportEvent, bookmakerKey, "categoryName": categories[0]->title, "authorName": author->name, "authorImage": author->image, promotedCategory, sections, area }`;'
content = re.sub(old_sports, new_sports, content)

old_casino = r'const casinoQuery = `\*\[_type == "post" && \(area == "Cassino" \|\| promotedCategory == "casino" \|\| "casino" in sections\)\] \| order\(publishedAt desc, _createdAt desc\)\[0\.\.\.12\] \{ primaryCategory, contentType, primaryCasinoOperator->\{slug\}, \.\.\., "categoryName": categories\[0\]->title, "authorName": author->name, "authorImage": author->image, promotedCategory, sections, area \}`;'
new_casino = 'const casinoQuery = `*[_type == "post" && (primaryCategory == "Cassino" || area == "Cassino" || promotedCategory == "casino" || "casino" in sections)] | order(publishedAt desc, _createdAt desc)[0...12] { _id, title, slug, mainImage, publishedAt, _createdAt, primaryCategory, contentType, primaryCasinoOperator->{slug}, casinoOperators[]->{slug, title}, sportCompetition->{slug, title}, sportEvent, bookmakerKey, "categoryName": categories[0]->title, "authorName": author->name, "authorImage": author->image, promotedCategory, sections, area }`;'
content = re.sub(old_casino, new_casino, content)

with open("src/pages/dfolgabet/DfolgaBetHome.tsx", "w") as f:
    f.write(content)
