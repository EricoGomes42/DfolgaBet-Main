import re

with open("src/pages/dfolgabet/DfolgaBetPost.tsx", "r") as f:
    content = f.read()

# I will find all instances of the json-ld breadcrumbs in Helmet and leave only one.
helmet_json_ld = r"""        <script type="application/ld\+json">\n          \{JSON\.stringify\(breadcrumbList\)\}\n        </script>"""

# Replace all with empty
content = re.sub(helmet_json_ld, "", content)

# And put one back just before </Helmet>
content = content.replace("</Helmet>", """        <script type="application/ld+json">
          {JSON.stringify(breadcrumbList)}
        </script>
      </Helmet>""", 1)

with open("src/pages/dfolgabet/DfolgaBetPost.tsx", "w") as f:
    f.write(content)
