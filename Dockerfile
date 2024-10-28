FROM node:14 as base

################ ####################################################
# load node version 19
FROM base as development
# create folder for app 
WORKDIR  /app
# move all package in container 
COPY package.json .

# insall dependences 
RUN npm config set strict-ssl false
RUN npm install

# insall dependences 
# copy . index.js copy this file in container
# copy all files in container
COPY . .
# ENV PORT=4000
# # EXPOSE ${PORT}
EXPOSE 4000
CMD ["npm" , "run", "start-dev"]

####################################################################
FROM base as production
# create folder for app 
WORKDIR  /app
# move all package in container 
COPY package.json .
# insall dependences 
RUN npm config set strict-ssl false
RUN npm install --only=production

# insall dependences 
# copy . index.js copy this file in container
# copy all files in container
COPY . .
# ENV PORT=4000
# # EXPOSE ${PORT}
EXPOSE 4000
CMD ["npm" , "run", "start"]







# # load node version 19
# FROM node:14

# # create folder for app 
# WORKDIR  /app

# # move all package in container 
# COPY package.json .


# # insall dependences 
# RUN npm config set strict-ssl false
# # insall dependences 
# ARG NODE_ENV
# # Take arg from docker compose to run for production or for development so donot run nodemon in production
# RUN if [ "$NODE_ENV" = "production" ]; \
#     then npm install --only=production; \
#     else npm install; \
#     fi

# # copy . index.js copy this file in container

# # copy all files in container
# COPY . .
 
# # ENV PORT=4000

# # # EXPOSE ${PORT}


# EXPOSE 4000

# CMD ["npm" , "run", "start-dev"]