# Contributing

## Frontend

### Understanding File-Structure
- The directories `frontend/android` and `frontend/ios` are prebuilt to support React Native.
- The main directory we care about is `frontend/app`, which holds the common code.
- Within the `app` folder, there are `components` and `pages`. Pages are made up of components, 
  and are rendered by our navigator.

### Downloading Dependencies
From the `frontend` folder, run:
```
npm install
```

### Starting Project
You can start the frontend with:
```
npm run web
```

## Backend

### Downloading Dependencies
From the `backend` folder, run:
```
pip install -r requirements.txt
```

### Starting Project
You can start the backend with:
```
python routes.py
```
