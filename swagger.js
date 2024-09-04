/**
 * @swagger
 * tags:
 *   - name: Install
 *     description: Operations related to database installation
 *   - name: Auth
 *     description: Authentication-related operations
 *   - name: Anime
 *     description: Anime-related operations
 *   - name: User
 *     description: User-related operations
 *   - name: Rating
 *     description: Operations related to anime reviews
 */

/**
 * @swagger
 * /install:
 *   get:
 *     summary: Database installation
 *     tags: [Install]
 *     responses:
 *       200:
 *         description: Database installed successfully
 *       500:
 *         description: Internal server error during installation
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate user
 *     tags: [Auth]
 *     parameters:
 *       - name: Credentials
 *         in: body
 *         description: User credentials for authentication
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: User successfully authenticated
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */



/**
 * @swagger
 * /animes/create:
 *   post:
 *     summary: Register a new anime (admin)
 *     tags: [Anime]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: AnimeData
 *         in: body
 *         description: Data of the anime to be registered
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *     responses:
 *       200:
 *         description: Anime registered successfully
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /animes/edit/{title}:
 *   put:
 *     summary: Update an existing anime (admin)
 *     tags: [Anime]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: AnimeTitle
 *         in: path
 *         description: Title of the anime to be updated
 *         required: true
 *         schema:
 *           type: string
 *       - name: AnimeData
 *         in: body
 *         description: Updated data of the anime
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *     responses:
 *       200:
 *         description: Anime updated successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Anime not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /animes/delete/{title}:
 *   delete:
 *     summary: Delete an existing anime (admin)
 *     tags: [Anime]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: AnimeTitle
 *         in: path
 *         description: Title of the anime to be updated
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Anime updated successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Anime not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /animes/list:
 *   get:
 *     summary: Get a list of anime
 *     tags: [Anime]
 *     security:
 *     parameters:
 *       - name: limite
 *         in: query
 *         description: Number of items per page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 10
 *       - name: pagina
 *         in: query
 *         description: Page number for paginated results
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 10
 *     responses:
 *       200:
 *         description: List of anime retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /animes/{title}:
 *   get:
 *     summary: Get a list of one anime (admin)
 *     tags: [Anime]
 *     security:
 *     parameters:
 *       - name: title
 *         in: params
 *         description: Filter anime by title
 *         required: true
 *         schema:
 *           type: string
 *       - name: limite
 *         in: query
 *         description: Number of items per page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *       - name: pagina
 *         in: query
 *         description: Page number for paginated results
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *     responses:
 *       200:
 *         description: List of anime retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /animes/exportAnimes:
 *   get:
 *     summary: Get a list csv of anime
 *     tags: [Anime]
 *     security:
 *     parameters:
 *       - name: limite
 *         in: query
 *         description: Number of items per page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 10
 *       - name: pagina
 *         in: query
 *         description: Page number for paginated results
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 10
 *     responses:
 *       200:
 *         description: List of anime retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user 
 *     tags: [User]
 *     security:
 *     parameters:
 *       - name: UserData
 *         in: body
 *         description: Data of the user to be registered
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/edit/{email}:
 *   put:
 *     summary: Update an existing user
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: UserEmail
 *         in: path
 *         description: Email of the user to be updated
 *         required: true
 *         schema:
 *           type: string
 *       - name: UserData
 *         in: body
 *         description: Updated data of the user
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/admin/register:
 *   post:
 *     summary: Register a new user (admin)
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: UserData
 *         in: body
 *         description: Data of the user to be registered
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/admin/list:
 *   get:
 *     summary: Get a list of users (admin)
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: limite
 *         in: query
 *         description: Number of items per page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 10
 *       - name: pagina
 *         in: query
 *         description: Page number for paginated results
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 10
 *     responses:
 *       200:
 *         description: List of user retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/admin/{email}:
 *   put:
 *     summary: Update an existing user (admin)
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: UserEmail
 *         in: path
 *         description: Email of the user to be updated
 *         required: true
 *         schema:
 *           type: string
 *       - name: UserData
 *         in: body
 *         description: Updated data of the user
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/admin/{email}:
 *   delete:
 *     summary: Delete an existing user (admin)
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: UserEmail
 *         in: path
 *         description: Email of the user to be updated
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Anime updated successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Anime not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/admin/registerAdmin:
 *   post:
 *     summary: Register a new Admin (admin)
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: UserData
 *         in: body
 *         description: Data of the user to be registered
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             role:
 *               type: string
 *     responses:
 *       200:
 *         description: Admin registered successfully
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /rating/{title}/rate:
 *   post:
 *     summary: Rate a anime 
 *     tags: [Rating]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: AnimeTitle
 *         in: path
 *         description: Title of Anime
 *         required: true
 *         schema:
 *           type: string
 *       - name: RateData
 *         in: body
 *         description: Data of the rate to be registered
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             rating:
 *               type: number
 *             comments:
 *               type: string
 *     responses:
 *       200:
 *         description: Rate registered successfully
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /rating/listByValue/{rating}:
 *   get:
 *     summary: Get a list of rate
 *     tags: [Rating]
 *     security:
 *      - BearerAuth: []
 *     parameters:
 *       - name: limite
 *         in: query
 *         description: Number of items per page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 10
 *       - name: pagina
 *         in: query
 *         description: Page number for paginated results
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 10
 *     responses:
 *       200:
 *         description: List of rate retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   rating:
 *                     type: Number
 *                   comments:
 *                     type: string
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /rating/edit/{comments}:
 *   put:
 *     summary: Update an existing rating (admin)
 *     tags: [Rating]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: Comments
 *         in: path
 *         description: Comments of the rate to be updated
 *         required: true
 *         schema:
 *           type: string
 *       - name: RateData
 *         in: body
 *         description: Updated data of the rate
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             comments:
 *               type: string
 *     responses:
 *       200:
 *         description: Comments updated successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Anime not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /rating/{_id}:
 *   delete:
 *     summary: Delete an existing rate (admin)
 *     tags: [Rating]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: RateId
 *         in: path
 *         description: Id of the rate to be deleted
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rate deleted successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Anime not found
 *       500:
 *         description: Internal server error
 */