const User = require('../models/User');
const authService = require('../services/authService');
const errorHandler = require('../utils/errorHandler');

const register = async (req, res) => {
        const { name, email, password, role } = req.body;

        // Verifica se o e-mail já está em uso
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Validação: Verifica se name, email e password são strings e foram fornecidos
        if (!name || !email || !password || typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ error: 'Invalid data format. Name, email, and password are required and must be strings.' });
        }
    
        // Cria um novo usuário
        const user = new User({ name, email, password, role });

        await user.save();

        res.json({ success: true, message: 'User created successfully' });

};
const edit = async (req, res) => {
        const userEmail = req.params.email;
        const updatedUserData = req.body;

        // Verifica se o usuário autenticado é o mesmo que está sendo editado
        if (req.user.email !== userEmail) {
            return res.status(403).json({ error: 'Permission denied. You can only edit your own profile.' });
        }

        // Verifica se o usuário a ser editado existe
        const userToUpdate = await User.findOne({ email: userEmail });
        if (!userToUpdate) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Validação: Verifica se os dados de edição são strings
        if (
            (updatedUserData.name && typeof updatedUserData.name !== 'string') ||
            (updatedUserData.email && typeof updatedUserData.email !== 'string') ||
            (updatedUserData.password && typeof updatedUserData.password !== 'string')
        ) {
            return res.status(400).json({ error: 'Invalid data format. Name, email, and password must be strings.' });
        }

        // Atualiza os dados do usuário
        userToUpdate.name = updatedUserData.name || userToUpdate.name;
        userToUpdate.email = updatedUserData.email || userToUpdate.email;
        userToUpdate.password = updatedUserData.password || userToUpdate.password;
                
        // Salva as alterações no banco de dados
        await userToUpdate.save();

        res.status(200).json({ message: 'Hello User, User updated successfully', user: userToUpdate });
};

const adminAddUser = async (req, res) => {
            const { name, email, password, role } = req.body;

            // Verifica se o e-mail já está em uso
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'Email already in use' });
            }

            // Cria um novo usuário
            const user = new User({ name, email, password, role });
            await user.save();
            res.json({ success: true, message: 'Hello Admin, User created successfully' });
};

const adminListUser = async (req, res) => {
    try {
        const { limite, pagina } = req.query;

        // Validação: Verifica se os parâmetros de paginação são válidos
        const limiteInt = parseInt(limite, 10);
        const paginaInt = parseInt(pagina, 10);

        if (!Number.isInteger(limiteInt) || !Number.isInteger(paginaInt) || limiteInt <= 0 || paginaInt < 1) {
            return res.status(400).json({ error: 'Invalid pagination parameters. Please provide valid values.' });
        }

        // Calcula o índice de início com base nos parâmetros de paginação
        const indiceInicio = (paginaInt - 1) * limiteInt;

        // Consulta os usuários com a paginação
        const users = await User.find().skip(indiceInicio).limit(limiteInt);

        // Verifica se há usuários encontrados
        if (!users || users.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }

        res.json(users);
    } catch (error) {
        // Se ocorrer algum erro durante o processo, você pode lidar com isso aqui
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const adminEditUser = async (req, res) => {
        const userEmail = req.params.email;
        const updatedUserData = req.body;

        // Verifica se o usuário a ser editado existe
        const userToUpdate = await User.findOne({ email: userEmail });
        if (!userToUpdate) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Atualiza os dados do usuário
        userToUpdate.name = updatedUserData.name || userToUpdate.name;
        userToUpdate.email = updatedUserData.email || userToUpdate.email;
        userToUpdate.password = updatedUserData.password || userToUpdate.password;
                
        // Salva as alterações no banco de dados
        await userToUpdate.save();

        res.status(200).json({ message: 'Hello Admin, User updated successfully', user: userToUpdate });      
};

const adminDeletUser = async (req, res) => {
        const userEmail = req.params.email;

        // Verifica se o usuário a ser excluído existe
        const userToDelete = await User.findOne({ email: userEmail });
        if (!userToDelete) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Remove o usuário do banco de dados
        await userToDelete.deleteOne();

        res.json({ success: true, message: 'Hello Admin, User deleted successfully' });  
};

const adminAddAdmin = async (req, res) => {
        const newAdminData = req.body;

        // Cria um novo usuário com a função de administrador
        const newAdmin = await User.create({
            name: newAdminData.name,
            password: newAdminData.password,
            email: newAdminData.email,
            role: 'admin',
        });

        res.status(201).json({ message: 'Hello Admin, User Admin created successfully', admin: newAdmin });     
};

module.exports = {
    register,
    edit,
    adminAddUser,
    adminListUser,
    adminEditUser,
    adminDeletUser,
    adminAddAdmin
};
