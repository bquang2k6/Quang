#PYTHON


import tkinter as tk
import random


def create_window():
    popup = tk.Toplevel()
    popup.geometry("320x160")  
    popup.title("Tràn ngập bộ...")
   
    frame = tk.Frame(popup, bg='white', padx=2, pady=2)
    frame.pack(expand=True, fill='both', padx=10, pady=10)
   
   
    inner_frame = tk.Frame(frame, bg='#FFC0CB')
    inner_frame.pack(expand=True, fill='both', padx=5, pady=5)  
   
    label = tk.Label(inner_frame, text="Nhớ nhớ nhớ em!!!", bg='#FFC0CB', font=("Noto Sans", 16, "italic"))
    label.pack(expand=True)
   
    x = random.randint(0, popup.winfo_screenwidth() - 320)
    y = random.randint(0, popup.winfo_screenheight() - 160)
    popup.geometry(f"320x160+{x}+{y}")


def create_windows_with_delay(count=50, delay=200):
    if count > 0:
        create_window()
        root.after(delay, create_windows_with_delay, count-1, delay)


def on_click():
    create_windows_with_delay()


def main_window():
    global root
    root = tk.Tk()
    root.geometry("420x210")  
    root.title("Anh có điều muốn nói là ...")
    root.configure(bg='#FFC0CB')  
   
    screen_width = root.winfo_screenwidth()
    screen_height = root.winfo_screenheight()


    window_width = 420
    window_height = 210


    position_x = int((screen_width / 2) - (window_width / 2))
    position_y = int((screen_height / 2) - (window_height / 2))


    root.geometry(f"{window_width}x{window_height}+{position_x}+{position_y}")
   
    button = tk.Button(root, text="Muốn nói là...", font=("Noto Sans", 24), command=on_click, bg='#FFC0CB')
    button.pack(expand=True)
   
    root.mainloop()


main_window()



