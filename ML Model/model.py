from math import e
from sklearn import linear_model
import nltk
import json
import numpy as np
from nltk.sentiment.vader import SentimentIntensityAnalyzer

chat_messages = ['suggestionï¼š dress black clothes..\n', '\n', 'I need the MLE for my thesis in trade! You made it really clear and easy for me to understand! I literally didnt even know what that is and now Ill use it for my estimation. THANK YOU\n', 
'\n', 'Thank you! needed a quick recap and this helped. The software that you are using is amazing!\n', '\n', 'You are so awesome! I wish I could sit in your classrooms!\n', '\n', 'Great explanation. Thank you !\n', '\n', 'Very helpful!\n', '\n', 'Impressive...How do you do that. It is amazing. Well, Thank you, your videos are excellent.\n', '\n', 'Thanks for you great job ! Its so helpful.\n', '\n', 'Thank you! very presentative and  intuitive explanation\n', '\n', 'very helpful,thank you\n', '\n', 'i finally understnad it, thanks\n', '\n', 'you are amazing prof.\n', '\n', 'Excellent explanation\n', '\n', 'Thanks. Nice explanation.\n', '\n', 'Thank u so much!\n', '\n', 'Super helpful tutorial! Thank you so much :)\n', '\n', 'thank you!!\n', '\n', 'Please make a vedio on sufficiency or sufficient estimator .\n', '\n', 'Thanks, I m from India.\n', '\n', 'You used theta as the parameter here. Does this theta hold the same meaning as lambda for a Poisson distribution?\n', '\n', 'i have tried to understand stats .. but not my cup of tea.   :(\n', '\n', 'Do you actually write backwards?!?\n', '\n', 'Thanks...\n', '\n', 'Nice\n', '\n', 'wtf she writes backward']

rawdata = [
    [
        {"playerState":"playing","timeInVideo":0,"time":1618666378.248},
        {"playerState":"paused","timeInVideo":11.048361925613403,"time":1618666390.961},
        {"playerState":"playing","timeInVideo":11.15,"time":1618666403.866},
        {"playerState":"paused","timeInVideo":22.49884718119812,"time":1618666415.241},
        {"playerState":"paused","timeInVideo":14.740168657141124,"time":1618666416.773},
        {"playerState":"playing","timeInVideo":14.84,"time":1618666418.054},
        {"playerState":"playing","timeInVideo":11.220901572543205,"time":1618666421.85},
        {"playerState":"playing","timeInVideo":6.6665540104941545,"time":1618666425.222},
        {"playerState":"playing","timeInVideo":2.526239208011289,"time":1618666429.555},
        {"playerState":"paused","timeInVideo":27.573911051498413,"time":1618666455.106},
        {"playerState":"playing","timeInVideo":27.67,"time":1618666463.071},
        {"playerState":"paused","timeInVideo":49.443869030517575,"time":1618666485.177},
        {"playerState":"paused","timeInVideo":38.33996487919708,"time":1618666487.598},
        {"playerState":"playing","timeInVideo":38.440000000000005,"time":1618666488.516},
        {"playerState":"paused","timeInVideo":68.73567309346008,"time":1618666519.855},
        {"playerState":"playing","timeInVideo":68.83999999999999,"time":1618666521.827},
        {"playerState":"paused","timeInVideo":104.15983297138978,"time":1618666557.927},
        {"playerState":"paused","timeInVideo":98.16751953200504,"time":1618666558.717},
        {"playerState":"paused","timeInVideo":94.64824676154979,"time":1618666559.547},
        {"playerState":"playing","timeInVideo":98.27,"time":1618666560.474},
        {"playerState":"paused","timeInVideo":151.59823508583068,"time":1618666615.105},
        {"playerState":"paused","timeInVideo":140.39873591889474,"time":1618666616.642},
        {"playerState":"paused","timeInVideo":-35.830677641758605,"time":1618666617.717},
        {"playerState":"playing","timeInVideo":0,"time":1618666618.286},
        {"playerState":"playing","timeInVideo":131.70407071143416,"time":1618666621.386},
        {"playerState":"playing","timeInVideo":216.1217698448686,"time":1618666622.49},
        {"playerState":"playing","timeInVideo":121.3532858374235,"time":1618666625.788},
        {"playerState":"playing","timeInVideo":115.34982788128578,"time":1618666630.456},
        {"playerState":"paused","timeInVideo":177.53765115830993,"time":1618666693.93},
        {"playerState":"playing","timeInVideo":177.64,"time":1618666697.143},
        {"playerState":"paused","timeInVideo":239.16926891607665,"time":1618666759.279},
        {"playerState":"playing","timeInVideo":239.26999999999998,"time":1618666760.807},
        {"playerState":"playing","timeInVideo":274.33791857097077,"time":1618666813.409},
        {"playerState":"playing","timeInVideo":328.5760622418505,"time":1618666862.753},
        {"playerState":"playing","timeInVideo":337.06370538367065,"time":1618666863.611},
        {"playerState":"playing","timeInVideo":337.68476020887726,"time":1618666868.78},
        {"playerState":"playing","timeInVideo":360.6634930769406,"time":1618666869.822},
        {"playerState":"playing","timeInVideo":364.3897765413216,"time":1618666870.829},
        {"playerState":"playing","timeInVideo":379.08789970491995,"time":1618666872.048},
        {"playerState":"playing","timeInVideo":387.1614987154592,"time":1618666876.386},
        {"playerState":"paused","timeInVideo":391.6796079771118,"time":1618666881.666}
    ],
    [
        {"playerState":"playing","timeInVideo":0,"time":1618666378.248},
        {"playerState":"paused","timeInVideo":10.048361925613403,"time":1618666390.961},
        {"playerState":"playing","timeInVideo":11.15,"time":1618666403.866},
        {"playerState":"paused","timeInVideo":22.49884718119812,"time":1618666415.241},
        {"playerState":"paused","timeInVideo":19.740168657141124,"time":1618666416.773},
        {"playerState":"playing","timeInVideo":14.84,"time":1618666418.054},
        {"playerState":"playing","timeInVideo":11.220901572543205,"time":1618666421.85},
        {"playerState":"playing","timeInVideo":2.6665540104941545,"time":1618666425.222},
        {"playerState":"playing","timeInVideo":2.526239208011289,"time":1618666429.555},
        {"playerState":"paused","timeInVideo":27.573911051498413,"time":1618666455.106},
        {"playerState":"playing","timeInVideo":27.67,"time":1618666463.071},
        {"playerState":"paused","timeInVideo":49.443869030517575,"time":1618666485.177},
        {"playerState":"paused","timeInVideo":40.33996487919708,"time":1618666487.598},
        {"playerState":"playing","timeInVideo":38.440000000000005,"time":1618666488.516},
        {"playerState":"paused","timeInVideo":68.73567309346008,"time":1618666519.855},
        {"playerState":"playing","timeInVideo":68.83999999999999,"time":1618666521.827},
        {"playerState":"paused","timeInVideo":104.15983297138978,"time":1618666557.927},
        {"playerState":"paused","timeInVideo":98.16751953200504,"time":1618666558.717},
        {"playerState":"paused","timeInVideo":94.64824676154979,"time":1618666559.547},
        {"playerState":"playing","timeInVideo":98.27,"time":1618666560.474},
        {"playerState":"paused","timeInVideo":151.59823508583068,"time":1618666615.105},
        {"playerState":"paused","timeInVideo":140.39873591889474,"time":1618666616.642},
        {"playerState":"paused","timeInVideo":35.830677641758605,"time":1618666617.717},
        {"playerState":"playing","timeInVideo":0,"time":1618666618.286},
        {"playerState":"playing","timeInVideo":131.70407071143416,"time":1618666621.386},
        {"playerState":"playing","timeInVideo":216.1217698448686,"time":1618666622.49},
        {"playerState":"playing","timeInVideo":121.3532858374235,"time":1618666625.788},
        {"playerState":"playing","timeInVideo":115.34982788128578,"time":1618666630.456},
        {"playerState":"paused","timeInVideo":177.53765115830993,"time":1618666693.93},
        {"playerState":"playing","timeInVideo":179.64,"time":1618666697.143},
        {"playerState":"paused","timeInVideo":239.16926891607665,"time":1618666759.279},
        {"playerState":"playing","timeInVideo":239.26999999999998,"time":1618666760.807},
        {"playerState":"playing","timeInVideo":274.33791857097077,"time":1618666813.409},
        {"playerState":"playing","timeInVideo":328.5760622418505,"time":1618666862.753},
        {"playerState":"playing","timeInVideo":337.06370538367065,"time":1618666863.611},
        {"playerState":"playing","timeInVideo":332.68476020887726,"time":1618666868.78},
        {"playerState":"playing","timeInVideo":360.6634930769406,"time":1618666869.822},
        {"playerState":"playing","timeInVideo":364.3897765413216,"time":1618666870.829},
        {"playerState":"playing","timeInVideo":379.08789970491995,"time":1618666872.048},
        {"playerState":"playing","timeInVideo":394.1614987154592,"time":1618666876.386},
        {"playerState":"paused","timeInVideo":391.6796079771118,"time":1618666881.666}
    ]
    # [
        
    # ], 
    # [
        
    # ],
    # [
        
    # ]
]

total_length = 392

lecturer = [0.5, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 0.8, 0.5, 0.5, 0.8, 0.8, 0.8, 0.8, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.5, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 0.8, 0.8, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.5, 0.5, 0.5]

def sentiment_analysis(chat_messages):
    nltk.download('vader_lexicon')
    sid = SentimentIntensityAnalyzer()
    
    sentlst = [sid.polarity_scores(sentence) for sentence in chat_messages if len(sentence)>2]
    neg = 0
    neu = 0
    pos = 0

    for msg in sentlst:
        neg += msg['neg']
        neu += msg['neu']
        pos += msg['pos']
    
    sentiment = [neg, neu, pos]
    s = sum(sentiment)
    return [i/s for i in sentiment]

def data_extractor(rawdata, total_length):
    n_ints = 100
    int_l = total_length / n_ints
    def interval(timeinvideo):
        return int(timeinvideo//int_l)

    total_data_arr = []

    for data in rawdata:        
        data_arr = [] # [['play', '32.3', 2023014900], ['pause', '35.3', 2023014900]]
    
        for action in data:
            data_arr.append(list(action.values())+[0,0,0,0,0]) # rt, rf, ft, ff
        
        # [action, timeinvideo, truetime, pauseduration, rt, rf, ft, ff]
        
        final_data = [[0,0,0,0,0,0,0] for i in range(n_ints)]
        
        # [numpauses, pauseduration, sentiment, rt, rf, ft, ff]
        
        ## changing timeinvideos, truetime to floats
        for action in range(len(data_arr)):
            data_arr[action][1] = float(data_arr[action][1])
        
        ## Extracting rewinded to, rewinded from and putting it into data_arr
        for ai in range(len(data_arr)-1):
            if data_arr[ai+1][0] ==  data_arr[ai][0]:
                # jump has occurred
                if data_arr[ai+1][1] > data_arr[ai][1]:
                    # forward has occurred
                    data_arr[ai+1][6] = 1
                    data_arr[ai][7] = 1
        
                elif data_arr[ai+1][1] < data_arr[ai][1]:
                    # rewind has occurred
                    data_arr[ai+1][4] = 1
                    data_arr[ai][5] = 1
            if data_arr[ai][0] == 'paused' and data_arr[ai+1][0] == 'playing':
                data_arr[ai][3] = data_arr[ai+1][2] - data_arr[ai][2]
        
        ## Extracting pauses, rewinds, forwards
        for action in data_arr:
            inter = interval(action[1])
            if inter < 0:
                continue
            if inter == 100:
                inter = 99
            # handling pauses
            if action[0] == 'paused':
                final_data[inter][0] += 1
                final_data[inter][1] += action[3]
            # handling forwards, rewinds
            final_data[inter][3:] = [final_data[inter][3:][i] or action[4:][i] for i in range(4)]

        total_data_arr.append(final_data)

    return total_data_arr

def predictor(data_in, lecturer):
    def beta(i):
        return 0.8*e**(-0.01*i)

    regr = linear_model.LinearRegression()
    
    d = lecturer
    
    regr.fit(data_in[0], d)

    n = len(data_in)

    q = False

    # train on a series of groups already watched
    for i in range(1, n):
        group = data_in[i]
        if q:
            # TODO
            d = beta(i)*(beta(i)*regr.predict(group) + (1-beta(i))*q)
        else: 
            d = [beta(i)*regr.predict(group)[j] + (1-beta(i))*d[j] for j in range(len(d))]
        regr.fit(group, d)

    def normalise(x):
        return [(i - min(x))/(max(x)-min(x)) for i in x]
        
    return normalise(d)
    
def main(event, context):
    if event['path'] == '/predict' and event['httpMethod'] == 'GET': 
        return {
            "status_code": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control_Allow-Origin": "*",
                "Access-Control_Allow-Headers": "*",
                "Access-Control_Allow-Methods": "*"
            },
            'body': json.dumps({
                "status": "success",
                "difficulties": predictor(data_extractor(rawdata, total_length), lecturer)
            })
        }

    elif event['path'] == '/sentiment' and event['httpMethod'] == 'GET': 
        return {
            "status_code": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control_Allow-Origin": "*",
                "Access-Control_Allow-Headers": "*",
                "Access-Control_Allow-Methods": "*"
            },
            'body': json.dumps({
                "status": "success",
                "sentimentPie": sentiment_analysis(chat_messages)
            })
        }
    else:
        return {
            "status_code": 400,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control_Allow-Origin": "*",
                "Access-Control_Allow-Headers": "*",
                "Access-Control_Allow-Methods": "*"
            },
            'body': json.dumps({
                "status": "failed",
                "error": "only get requests allowed; paths = 'predict' or 'sentiment' "
            })
        }