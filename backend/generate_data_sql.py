import re
import os

input_file = r"c:\xampp\htdocs\emirates\emirates_gold (1).sql"
output_file = r"c:\xampp\htdocs\emirates\backend\src\main\resources\data.sql"

if not os.path.exists(input_file):
    print(f"Error: {input_file} not found")
    exit(1)

with open(input_file, 'r', encoding='utf-8') as f:
    sql_content = f.read()

# Regular expression to find INSERT statements
# Example: INSERT INTO `diamond_bangles` (`id`, `name`, `code`, `weight`, `image`, `description`) VALUES (1, '...', ...);
insert_pattern = re.compile(r"INSERT INTO `([^`]+)`[^\(]*\([^\)]+\)\s*VALUES\s*(.*?);", re.IGNORECASE | re.DOTALL)

with open(output_file, 'w', encoding='utf-8') as out:
    # We will ignore the original IDs and let the database auto-increment if we just insert,
    # but the SQL has exact IDs. We can just insert without ID, or with ID if we clear the table first.
    # We will not include ID so it auto-increments.
    
    for match in insert_pattern.finditer(sql_content):
        table_name = match.group(1)
        values_str = match.group(2)
        
        # Determine Metal Type and Category based on the old table name
        metal_type = "Unknown"
        category = "Unknown"
        
        lower_table = table_name.lower()
        if "diamond" in lower_table:
            metal_type = "Diamond"
        elif "gold" in lower_table:
            metal_type = "Gold"
        elif "silver" in lower_table:
            metal_type = "Silver"
        elif "platinum" in lower_table:
            metal_type = "Platinum"
            
        if "bangle" in lower_table:
            category = "Bangles"
        elif "bracelet" in lower_table:
            category = "Bracelets"
        elif "earring" in lower_table:
            category = "Earrings"
        elif "necklace" in lower_table:
            category = "Necklaces"
        elif "pendant" in lower_table:
            category = "Pendants"
        elif "ring" in lower_table:
            category = "Rings"
        elif "chain" in lower_table:
            category = "Chains"
        elif "mangalsutra" in lower_table:
            category = "Mangalsutra"
        elif "mens" in lower_table:
            category = "Mens"
        elif "kids" in lower_table:
            category = "Kids"
        elif "traditional" in lower_table:
            category = "Traditional"
            
        # Parse the values tuples
        # Values look like: (1, 'name', 'code', 'weight', 'image', 'description'), (2, ...)
        # We need to extract the fields. The fields are: id, name, code, weight, image, description
        # We will split by "), (" taking care of internal commas (not perfect but mostly works for this simple dump)
        
        # A safer way to find tuples:
        tuples = re.findall(r"\((.*?)\)(?:,|$)", values_str, re.DOTALL)
        
        for t in tuples:
            # We assume the columns are strictly: id, name, code, weight, image, description
            # We want to reformulate to: name, code, weight, image, description, category, metalType
            
            # Use another regex to properly handle strings with commas
            fields = []
            escaping = False
            in_string = False
            current_field = []
            for char in t:
                if escaping:
                    current_field.append(char)
                    escaping = False
                    continue
                if char == '\\':
                    current_field.append(char)
                    escaping = True
                    continue
                if char == "'":
                    in_string = not in_string
                    current_field.append(char)
                    continue
                if char == "," and not in_string:
                    fields.append("".join(current_field).strip())
                    current_field = []
                    continue
                current_field.append(char)
            fields.append("".join(current_field).strip())
            
            if len(fields) >= 6:
                name = fields[1]
                code = fields[2]
                weight = fields[3]
                image = fields[4]
                description = fields[5]
                out.write(f"INSERT INTO `products` (`name`, `code`, `weight`, `image`, `description`, `category`, `metal_type`) VALUES ({name}, {code}, {weight}, {image}, {description}, '{category}', '{metal_type}');\n")

print(f"Successfully generated {output_file}")
