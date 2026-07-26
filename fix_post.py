import re

with open("src/pages/dfolgabet/DfolgaBetPost.tsx", "r") as f:
    content = f.read()

# Fix the query
new_query = '''        const query = `*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
          _id,
          title,
          slug,
          mainImage,
          publishedAt,
          _createdAt,
          body,
          excerpt,
          seoTitle,
          seoDescription,
          seoCustomCode,
          "authorName": author->name,
          "authorImage": author->image,
          "categoryName": categories[0]->title,
          primaryCategory,
          contentType,
          primaryCasinoOperator->{slug},
          casinoOperators[]->{slug, title},
          sportCompetition->{slug, title},
          sportEvent,
          faq,
          bookmakerKey,
          area,
          sections,
          promotedCategory
        }`;'''

content = re.sub(r'const query = `\*\[_type == "post" && slug\.current == \$slug && !.*?`;', new_query, content, flags=re.DOTALL)

with open("src/pages/dfolgabet/DfolgaBetPost.tsx", "w") as f:
    f.write(content)
