import requests

def sendMessage(text: str):
    token = "1611361843:AAGVL8ALrGD430msXCdqNxnrXRFmIYHgIpU"
    url = "https://api.telegram.org/bot"
    channel_id = "@testNumberss"
    url += token
    method = url + "/sendMessage"

    r = requests.post(method, data={
         "chat_id": channel_id,
         "text": text
          })

    if r.status_code != 200:
        raise Exception("post_text error")
