import pyautogui as pt
from time import sleep
import pyperclip
import random

sleep(5)

position1 = pt.locateOnScreen("detection_img/green_msg.png", confidence=.6)
x = position1[0]
y = position1[1]

# Gets message
def get_message():
    global x, y

    position = pt.locateOnScreen("detection_img/green_msg.png", confidence=.6)
    x = position[0]
    y = position[1]
    pt.moveTo(x, y, duration=.01)
    pt.moveTo(x + 90, y - 50, duration = .01)

    pt.tripleClick()
    pt.rightClick()
    pt.moveRel(12,-15*9)
    pt.click()
    
    whatsapp_message = pyperclip.paste()
    print("Message received: " + whatsapp_message)
    
    return whatsapp_message


#Response
def post_response(message):
    global x, y

    position = pt.locateOnScreen("detection_img/green_msg.png", confidence=.6)
    x = position[0]
    y = position[1]
    pt.moveTo(x + 200, y + 20, duration=.01)    
    pt.click()
    pt.typewrite(message, interval=0.01)

    pt.typewrite("\n", interval=.01)


#Processes response
def process_response(message):
    random_no= random.randrange(3)

    if "?" in str(message).lower():
        return "Don't ask me any questions!"
    else:
        if random_no == 0:
            return "That's cool!"
        elif random_no == 1:
            return "Hellow"
        else:
            return "Todo Bien"
    
#Check for new messages
def check_for_new_messages():
    pt.moveTo(x + 50, y - 35, duration=.5)

    while True:
        #Continuously checks for green dont and new messages
        try:
            position = pt.locateOnScreen("detection_img/circulo_verde.png", confidence=.7)
            if position is not None:
                pt.moveTo(position)
                pt.moveRel(-100, 0)
                pt.click()
                sleep(.5)
        except(Exception):
            print("No hay nuevo mensaje")

        #pt.moveTo(x + 50, y - 35, duration=.5)

        if pt.pixelMatchesColor((50), (35), (255, 255, 255), tolerance=10):
            print("is_white")   
            processed_message = process_response(get_message())
            post_response(processed_message)
        else:
            print("No new Message yet...")
        sleep(5)

check_for_new_messages()


