# topic_mapper.py

TOPIC_MAPPING = {

    "Triangle": "Geometry",

    "Circle": "Geometry",

    "Square": "Geometry",

    "Rectangle": "Geometry",

    "Star": "Geometry",

    "Arrow": "Basic Shapes",

    "Flowchart": "Programming",

    "ER Diagram": "Database Management System",

    "Bar Graph": "Statistics",

    "Network Diagram": "Computer Networks"

}


def get_topic(diagram):

    return TOPIC_MAPPING.get(diagram, "General Learning")


if __name__ == "__main__":

    diagram = "Triangle"

    topic = get_topic(diagram)

    print("Diagram :", diagram)
    print("Topic   :", topic)
