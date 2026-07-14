from googleapiclient.discovery import build

API_KEY = "YOUR_API_KEY"

youtube = build(
    "youtube",
    "v3",
    developerKey=API_KEY
)


def search_videos(topic, max_results=5):

    request = youtube.search().list(
        part="snippet",
        q=topic,
        type="video",
        maxResults=max_results
    )

    response = request.execute()

    videos = []

    for item in response["items"]:

        videos.append({

            "title": item["snippet"]["title"],

            "channel": item["snippet"]["channelTitle"],

            "videoId": item["id"]["videoId"],

            "url": f"https://www.youtube.com/watch?v={item['id']['videoId']}"

        })

    return videos


if __name__ == "__main__":

    topic = "Geometry Triangle"

    videos = search_videos(topic)

    for video in videos:

        print(video["title"])
        print(video["url"])
        print()
