import mongoose, {ObjectId} from 'mongoose';
import {UserModel, IUser} from './user.js';
import {PostModel, IPost} from './post.js';

async function main() {
    mongoose.set('strictQuery', true);

    await mongoose.connect('mongodb://localhost:27017/seminari2')
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar:', err));

    const user1: IUser = {
        "name": 'Pau',
        "email": 'paucozar@gmail.com',
        "avatar": 'https://i.imgur.com/dM7Thhn.png',
        "post": [
            {
                "title": 'Mountains',
                "content": 'Mountains are the best',
                "date": new Date(),
                "autor": 'Pau'
            },
            {
                "title": 'Beach',
                "content": 'Beach is the best',
                "date": new Date(),
                "autor": 'Pau'
            }
        ]
    };

    const user2: IUser = {
        "name": 'Bill',
        "email": 'bill@gmail.com',
        "avatar": 'https://i.imgur.com/dM7Thhn.png',
        "post": [
            {
                "title": 'Snow and mountains',
                "content": 'Snowy mountains are the best',
                "date": new Date(),
                "autor": 'Bill'
            },
            {
                "title": 'Beach and sun',
                "content": 'Beach and sun are the best',
                "date": new Date(),
                "autor": 'Bill'
            }
        ]
    };

    const newUser1 = new UserModel(user1);
    const newUser2 = new UserModel(user2);
    const savedUser1: IUser = await newUser1.save();
    const savedUser2: IUser = await newUser2.save();

    console.log("User1 saved: ", savedUser1);
    console.log("User2 saved: ", savedUser2);

    //Función ver un usuario
    await UserModel.findOne({name: 'Bill'}).exec()
    .then(userFound => console.log("Usuario encontrado: " + userFound))
    .catch(err => console.error('Error al buscar:', err));

    //Función crear un usuario
    await UserModel.create({name: 'John', email: 'john@gmail.com'})
    .then(userCreated => console.log("Usuario creado: " + userCreated))
    .catch(err => console.error('Error al crear:', err));

    //Función borrar un usuario
    await UserModel.deleteOne({name: 'John'}).exec()
    .then(userDeleted => console.log("Usuario eliminado"))
    .catch(err => console.error('Error al eliminar:', err));

    //Función listar todos los usuarios
    await UserModel.find().exec()
    .then(users => console.log("Usuarios encontrados: " + users))
    .catch(err => console.error('Error al listar:', err));

    //Función para editar un usuario
    await UserModel.updateOne({name: 'Bill'}, {name: 'Bill Gates'}).exec()
    .then(userUpdated => console.log("Usuario actualizado"))
    .catch(err => console.error('Error al actualizar:', err));

    //Función para crear un post
    await PostModel.create({title: 'Post de prueba', content: 'Contenido de prueba', date: new Date()})
    .then(postCreated => console.log("Post creado: " + postCreated))
    .catch(err => console.error('Error al crear:', err));

    //Función para ver un post
    await PostModel.findOne({title: 'Post de prueba'}).exec()
    .then(postFound => console.log("Post encontrado: " + postFound))
    .catch(err => console.error('Error al buscar:', err));

    //Función para borrar un post
    await PostModel.deleteOne({title: 'Post de prueba'}).exec()
    .then(postDeleted => console.log("Post eliminado"))
    .catch(err => console.error('Error al eliminar:', err));

    //Función para listar todos los posts
    await PostModel.find().exec()
    .then(posts => console.log("Posts encontrados: " + posts))
    .catch(err => console.error('Error al listar:', err));

    //Función para editar un post
    await PostModel.updateOne({title: 'Snow and mountains'}, {title: 'Snow and mountains edited'}).exec()
    .then(postUpdated => console.log("Post actualizado"))
    .catch(err => console.error('Error al actualizar:', err));

    //Función para obtener los usuarios con conteo de posts
    const usersWithPostCount = await getUsersWithPostCount();
    console.log("Usuarios con conteo de posts: ", usersWithPostCount);
}

async function getUsersWithPostCount(){
    return UserModel.aggregate([
        {
            $project:{
                name: 1,
                email: 1,
                postCount: {$size: '$post'}
            }
        }
    ])
}

main()
