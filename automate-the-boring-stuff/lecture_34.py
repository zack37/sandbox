import os

for folder_name, sub_folders, file_names in os.walk(os.getcwd()):
    print('The folder is', folder_name)
    print('The sub folders in', folder_name, 'are:', sub_folders)
    print('The file names in', folder_name, 'are:', file_names)
    print()
