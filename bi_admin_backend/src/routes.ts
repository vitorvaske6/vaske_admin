import { Express, Request, Response } from 'express';

// API
import requireUser from './middleware/requireUser';
import validateResource from './middleware/validateResource';

// Session
import { getUserSessionsHandler, createSessionUserHandler, deleteSessionHandler, getGoogleOAuthHandler, getStayLoggedSessionHandler } from './controller/session.controller';
import { createSessionSchema } from './schema/session.schema';

// User
import { createUserHandler, getCurrentUserHandler } from './controller/user.controller';
import { createUserSchema } from './schema/user.schema';

// Profile
import { createProfileHandler, deleteProfileHandler, findProfileHandler, findAllProfileHandler, updateProfileHandler } from './controller/profile/profile.controller';
import { createProfileSchema, deleteProfileSchema, findProfileSchema, findAllProfileSchema, updateProfileSchema } from './schema/profile/profile.schema';

// ProfileFunction
import { createProfileFunctionHandler, deleteProfileFunctionHandler, findProfileFunctionHandler, findAllProfileFunctionHandler, updateProfileFunctionHandler } from './controller/profile/profileFunction.controller';
import { createProfileFunctionSchema, deleteProfileFunctionSchema, findProfileFunctionSchema, findAllProfileFunctionSchema, updateProfileFunctionSchema } from './schema/profile/profileFunction.schema';

// ProfileGroup
import { createProfileGroupHandler, deleteProfileGroupHandler, findProfileGroupHandler, findAllProfileGroupHandler, updateProfileGroupHandler } from './controller/profile/profileGroup.controller';
import { createProfileGroupSchema, deleteProfileGroupSchema, findProfileGroupSchema, findAllProfileGroupSchema, updateProfileGroupSchema } from './schema/profile/profileGroup.schema';

// ProfileType
import { createProfileTypeHandler, deleteProfileTypeHandler, findProfileTypeHandler, findAllProfileTypeHandler, updateProfileTypeHandler } from './controller/profile/profileType.controller';
import { createProfileTypeSchema, deleteProfileTypeSchema, findProfileTypeSchema, findAllProfileTypeSchema, updateProfileTypeSchema } from './schema/profile/profileType.schema';

// Company
import { createCompanyHandler, deleteCompanyHandler, findAllCompanyHandler, findCompanyHandler, updateCompanyHandler } from './controller/company/company.controller';
import { createCompanySchema, deleteCompanySchema, findCompanySchema, updateCompanySchema, findAllCompanySchema } from './schema/company/company.schema';

// CompanyDepartment
import { createCompanyDepartmentHandler, deleteCompanyDepartmentHandler, findAllCompanyDepartmentHandler, findCompanyDepartmentHandler, updateCompanyDepartmentHandler } from './controller/company/companyDepartment.controller';
import { createCompanyDepartmentSchema, deleteCompanyDepartmentSchema, findCompanyDepartmentSchema, updateCompanyDepartmentSchema, findAllCompanyDepartmentSchema } from './schema/company/companyDepartment.schema';

// CompanyType
import { createCompanyTypeHandler, deleteCompanyTypeHandler, findCompanyTypeHandler, findAllCompanyTypeHandler, updateCompanyTypeHandler } from './controller/company/companyType.controller';
import { createCompanyTypeSchema, deleteCompanyTypeSchema, findCompanyTypeSchema, findAllCompanyTypeSchema, updateCompanyTypeSchema } from './schema/company/companyType.schema';

// Product
import { createProductHandler, deleteProductHandler, findProductHandler, findAllProductHandler, updateProductHandler } from './controller/product.controller';
import { createProductSchema, deleteProductSchema, findProductSchema, findAllProductSchema, updateProductSchema } from './schema/product.schema';

// Report
import { createReportHandler, deleteReportHandler, findReportHandler, findAllReportHandler, updateReportHandler } from './controller/report/report.controller';
import { createReportSchema, deleteReportSchema, findReportSchema, findAllReportSchema, updateReportSchema } from './schema/report/report.schema';

// Report Groups
import { createReportGroupsHandler, deleteReportGroupsHandler, findReportGroupsHandler, findAllReportGroupsHandler, updateReportGroupsHandler } from './controller/report/reportGroups.controller';
import { createReportGroupsSchema, deleteReportGroupsSchema, findReportGroupsSchema, findAllReportGroupsSchema, updateReportGroupsSchema } from './schema/report/reportGroups.schema';

// Menu
import { createMenuHandler, deleteMenuHandler, findMenuHandler, findAllMenuHandler, updateMenuHandler } from './controller/app/menu.controller';
import { createMenuSchema, deleteMenuSchema, findMenuSchema, findAllMenuSchema, updateMenuSchema } from './schema/app/menu.schema';

// MenuGroups
import { createMenuGroupsHandler, deleteMenuGroupsHandler, findMenuGroupsHandler, findAllMenuGroupsHandler, updateMenuGroupsHandler } from './controller/app/menuGroups.controller';
import { createMenuGroupsSchema, deleteMenuGroupsSchema, findMenuGroupsSchema, findAllMenuGroupsSchema, updateMenuGroupsSchema } from './schema/app/menuGroups.schema';

// Pages
import { createPageHandler, deletePageHandler, findPageHandler, findAllPageHandler, updatePageHandler } from './controller/app/page.controller';
import { createPageSchema, deletePageSchema, findPageSchema, findAllPageSchema, updatePageSchema } from './schema/app/page.schema';

// Power BI
import { getEmbeddedInfoHandler } from './controller/powerbEmbedded.controller';
import { getAppInfoForMasterHandler, getAppInfoForUserHandler, getMenusInfoHandler } from './controller/app/app.controller';

// C4M
import { getC4mAuthHandler } from './controller/integrations/c4m.controller';
import { getC4mAuthSchema } from './schema/integrations/c4m.schema';

function routes(app: Express) {
    /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     summary: Checks if app is running.
   *     description: Checks if app is running.
   *     responses:
   *       200:
   *         description: App is running.
   */
    // API Health Check
    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

    /**
   * @openapi
   * '/api/app':
   *  get:
   *     tags:
   *     - App
   *     summary: Return the app info.
   *     description: Return the app info.
   *     responses:
   *       200:
   *         description: App info.
   */

    // App
    app.get('/api/app', getAppInfoForMasterHandler);
    app.get('/api/appUser', getAppInfoForUserHandler);
    app.get('/api/appMenus', getMenusInfoHandler);

  /**
   * @openapi
   * '/api/users':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   * '/api/users/me':
   *  get:
   *     tags:
   *     - User
   *     summary: Return the logged in user.
   *     description: Return the logged in user.
   *     responses:
   *       200:
   *         description: User info.
   */

    // Users
    app.post('/api/users', validateResource(createUserSchema), createUserHandler);
    app.get('/api/users/me', getCurrentUserHandler);

   /**
   * @openapi
   * '/api/sessions':
   *  post:
   *     tags:
   *     - Session
   *     summary: Create a session by logging in.
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateSessionInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateSessionResponse'
   *      404:
   *        description: User not found.
   *  get:
   *     tags:
   *     - Session
   *     summary: Find session of the user logging in.
   *     description: Return sessions of the logged in user.
   *     responses:
   *       200:
   *         description: Session info.
   *       403:
   *         description: User not logged in.
   * 
   *  delete:
   *     tags:
   *     - Session
   *     summary: Anull the session of the user by logging out.
   *     description: Inactive the actual session of the logged in user.
   *     responses:
   *       200:
   *         description: Access and Refresh token as null.
   * '/api/sessions/oauth/google':
   *  get:
   *     tags:
   *     - Session
   *     summary: Create a session by using google account.
   *     description: Return sessions of the logged in user.
   *     responses:
   *       200:
   *         description: Redirect to main page with a valid session.
   *       401:
   *         description: User invalid.
   *       403:
   *         description: User not verified.
   */
    // Sessions
    app.post('/api/sessions', validateResource(createSessionSchema), createSessionUserHandler);
    app.get('/api/sessions', requireUser, getUserSessionsHandler);
    app.delete('/api/sessions', requireUser, deleteSessionHandler);
    app.get('/api/sessions/oauth/google', getGoogleOAuthHandler)
    app.get('/api/sessions/reissue', getStayLoggedSessionHandler)

    /**
   * @openapi
   * '/api/profiles':
   *  post:
   *     tags:
   *     - Profile
   *     summary: Create a profile.
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateProfileInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateProfileResponse'
   *      403:
   *        description: Profile invalid.
   *  get:
   *     tags:
   *     - Profile
   *     summary: Find profile by id.
   *     description: Return requested profile.
   *     responses:
   *       200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Profile'
   *       404:
   *         description: No profile was found.
   * 
   * '/api/profiles/{_idProfile}':
   *  get:
   *     tags:
   *     - Profile
   *     summary: Find profile by id.
   *     description: Return requested profile.
   *     responses:
   *       200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Profile'
   *       404:
   *         description: Profile not found.
   * 
   *  delete:
   *     tags:
   *     - Profile
   *     summary: Delete the profile.
   *     description: Set the profile as active = false.
   *     responses:
   *       200:
   *         description: Access and Refresh token as null.
   *       401:
   *         description: User doesn't have access
   *       500:
   *         description: Server not found
   */
    // Profile
    app.post('/api/profiles', [requireUser, validateResource(createProfileSchema)], createProfileHandler);
    app.put('/api/profiles/:_id', [requireUser, validateResource(updateProfileSchema)], updateProfileHandler);
    app.get('/api/profiles/:_id', validateResource(findProfileSchema), findProfileHandler);
    app.get('/api/profiles/', validateResource(findAllProfileSchema), findAllProfileHandler);
    app.delete('/api/profiles/:_id', [requireUser, validateResource(deleteProfileSchema)], deleteProfileHandler);

    /**
   * @openapi
   * '/api/sessions':
   *  post:
   *     tags:
   *     - Session
   *     summary: Create a session by logging in.
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateSessionInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateSessionResponse'
   *      404:
   *        description: User not found.
   *  get:
   *     tags:
   *     - Session
   *     summary: Find session of the user logging in.
   *     description: Return sessions of the logged in user.
   *     responses:
   *       200:
   *         description: Session info.
   *       403:
   *         description: User not logged in.
   * 
   *  delete:
   *     tags:
   *     - Session
   *     summary: Anull the session of the user by logging out.
   *     description: Inactive the actual session of the logged in user.
   *     responses:
   *       200:
   *         description: Access and Refresh token as null.
   * '/api/sessions/oauth/google':
   *  get:
   *     tags:
   *     - Session
   *     summary: Create a session by using google account.
   *     description: Return sessions of the logged in user.
   *     responses:
   *       200:
   *         description: Redirect to main page with a valid session.
   *       401:
   *         description: User invalid.
   *       403:
   *         description: User not verified.
   */
    // ProfileFunctions
    app.post('/api/profileFunctions', [requireUser, validateResource(createProfileFunctionSchema)], createProfileFunctionHandler);
    app.put('/api/profileFunctions/:_id', [requireUser, validateResource(updateProfileFunctionSchema)], updateProfileFunctionHandler);
    app.get('/api/profileFunctions/:_id', validateResource(findProfileFunctionSchema), findProfileFunctionHandler);
    app.get('/api/profileFunctions/', validateResource(findAllProfileFunctionSchema), findAllProfileFunctionHandler);
    app.delete('/api/profileFunctions/:_id', [requireUser, validateResource(deleteProfileFunctionSchema)], deleteProfileFunctionHandler);

    /**
   * @openapi
   * '/api/sessions':
   *  post:
   *     tags:
   *     - Session
   *     summary: Create a session by logging in.
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateSessionInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateSessionResponse'
   *      404:
   *        description: User not found.
   *  get:
   *     tags:
   *     - Session
   *     summary: Find session of the user logging in.
   *     description: Return sessions of the logged in user.
   *     responses:
   *       200:
   *         description: Session info.
   *       403:
   *         description: User not logged in.
   * 
   *  delete:
   *     tags:
   *     - Session
   *     summary: Anull the session of the user by logging out.
   *     description: Inactive the actual session of the logged in user.
   *     responses:
   *       200:
   *         description: Access and Refresh token as null.
   * '/api/sessions/oauth/google':
   *  get:
   *     tags:
   *     - Session
   *     summary: Create a session by using google account.
   *     description: Return sessions of the logged in user.
   *     responses:
   *       200:
   *         description: Redirect to main page with a valid session.
   *       401:
   *         description: User invalid.
   *       403:
   *         description: User not verified.
   */
    // ProfileGroups 
    app.post('/api/profileGroups', [requireUser, validateResource(createProfileGroupSchema)], createProfileGroupHandler);
    app.put('/api/profileGroups/:_id', [requireUser, validateResource(updateProfileGroupSchema)], updateProfileGroupHandler);
    app.get('/api/profileGroups/:_id', validateResource(findProfileGroupSchema), findProfileGroupHandler);
    app.get('/api/profileGroups/', validateResource(findAllProfileGroupSchema), findAllProfileGroupHandler);
    app.delete('/api/profileGroups/:_id', [requireUser, validateResource(deleteProfileGroupSchema)], deleteProfileGroupHandler);

    /**
   * @openapi
   * '/api/sessions':
   *  post:
   *     tags:
   *     - Session
   *     summary: Create a session by logging in.
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateSessionInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateSessionResponse'
   *      404:
   *        description: User not found.
   *  get:
   *     tags:
   *     - Session
   *     summary: Find session of the user logging in.
   *     description: Return sessions of the logged in user.
   *     responses:
   *       200:
   *         description: Session info.
   *       403:
   *         description: User not logged in.
   * 
   *  delete:
   *     tags:
   *     - Session
   *     summary: Anull the session of the user by logging out.
   *     description: Inactive the actual session of the logged in user.
   *     responses:
   *       200:
   *         description: Access and Refresh token as null.
   * '/api/sessions/oauth/google':
   *  get:
   *     tags:
   *     - Session
   *     summary: Create a session by using google account.
   *     description: Return sessions of the logged in user.
   *     responses:
   *       200:
   *         description: Redirect to main page with a valid session.
   *       401:
   *         description: User invalid.
   *       403:
   *         description: User not verified.
   */
    // ProfileTypes
    app.post('/api/profileTypes', [requireUser, validateResource(createProfileTypeSchema)], createProfileTypeHandler);
    app.put('/api/profileTypes/:_id', [requireUser, validateResource(updateProfileTypeSchema)], updateProfileTypeHandler);
    app.get('/api/profileTypes/:_id', validateResource(findProfileTypeSchema), findProfileTypeHandler);
    app.get('/api/profileTypes/', validateResource(findAllProfileTypeSchema), findAllProfileTypeHandler);
    app.delete('/api/profileTypes/:_id', [requireUser, validateResource(deleteProfileTypeSchema)], deleteProfileTypeHandler);

    /**
   * @openapi
   * '/api/sessions': 
   *  post:
   *     tags:
   *     - Session
   *     summary: Create a session by logging in.
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateSessionInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateSessionResponse'
   *      404:
   *        description: User not found.
   *  get:
   *     tags:
   *     - Session
   *     summary: Find session of the user logging in.
   *     description: Return sessions of the logged in user.
   *     responses:
   *       200:
   *         description: Session info.
   *       403:
   *         description: User not logged in.
   * 
   *  delete:
   *     tags:
   *     - Session
   *     summary: Anull the session of the user by logging out.
   *     description: Inactive the actual session of the logged in user.
   *     responses:
   *       200:
   *         description: Access and Refresh token as null.
   * '/api/sessions/oauth/google':
   *  get:
   *     tags:
   *     - Session
   *     summary: Create a session by using google account.
   *     description: Return sessions of the logged in user.
   *     responses:
   *       200:
   *         description: Redirect to main page with a valid session.
   *       401:
   *         description: User invalid.
   *       403:
   *         description: User not verified.
   */
    // Company
    app.post('/api/companies', [requireUser, validateResource(createCompanySchema)], createCompanyHandler);
    app.put('/api/companies/:_id', [requireUser, validateResource(updateCompanySchema)], updateCompanyHandler);
    app.get('/api/companies/:_id', validateResource(findCompanySchema), findCompanyHandler);
    app.get('/api/companies/', validateResource(findAllCompanySchema), findAllCompanyHandler);
    app.delete('/api/companies/:_id', [requireUser, validateResource(deleteCompanySchema)], deleteCompanyHandler);
 
    /**
   * @openapi
   * '/api/sessions':
   *  post:
   *     tags:
   *     - Session
   *     summary: Create a session by logging in.
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateSessionInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateSessionResponse'
   *      404:
   *        description: User not found.
   *  get:
   *     tags:
   *     - Session
   *     summary: Find session of the user logging in.
   *     description: Return sessions of the logged in user.
   *     responses:
   *       200:
   *         description: Session info.
   *       403:
   *         description: User not logged in.
   * 
   *  delete:
   *     tags:
   *     - Session
   *     summary: Anull the session of the user by logging out.
   *     description: Inactive the actual session of the logged in user.
   *     responses:
   *       200:
   *         description: Access and Refresh token as null.
   * '/api/sessions/oauth/google':
   *  get:
   *     tags:
   *     - Session
   *     summary: Create a session by using google account.
   *     description: Return sessions of the logged in user.
   *     responses:
   *       200:
   *         description: Redirect to main page with a valid session.
   *       401:
   *         description: User invalid.
   *       403:
   *         description: User not verified.
   */
    // CompanyDepartments
    app.post('/api/companyDepartments', [requireUser, validateResource(createCompanyDepartmentSchema)], createCompanyDepartmentHandler);
    app.put('/api/companyDepartments/:_id', [requireUser, validateResource(updateCompanyDepartmentSchema)], updateCompanyDepartmentHandler);
    app.get('/api/companyDepartments/:_id', validateResource(findCompanyDepartmentSchema), findCompanyDepartmentHandler);
    app.get('/api/companyDepartments/', validateResource(findAllCompanyDepartmentSchema), findAllCompanyDepartmentHandler);
    app.delete('/api/companyDepartments/:_id', [requireUser, validateResource(deleteCompanyDepartmentSchema)], deleteCompanyDepartmentHandler);

    /**
   * @openapi
   * '/api/sessions':
   *  post:
   *     tags:
   *     - Session
   *     summary: Create a session by logging in.
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateSessionInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateSessionResponse'
   *      404:
   *        description: User not found.
   *  get:
   *     tags:
   *     - Session
   *     summary: Find session of the user logging in.
   *     description: Return sessions of the logged in user.
   *     responses:
   *       200:
   *         description: Session info.
   *       403:
   *         description: User not logged in.
   * 
   *  delete:
   *     tags:
   *     - Session
   *     summary: Anull the session of the user by logging out.
   *     description: Inactive the actual session of the logged in user.
   *     responses:
   *       200:
   *         description: Access and Refresh token as null.
   * '/api/sessions/oauth/google':
   *  get:
   *     tags:
   *     - Session
   *     summary: Create a session by using google account.
   *     description: Return sessions of the logged in user.
   *     responses:
   *       200:
   *         description: Redirect to main page with a valid session.
   *       401:
   *         description: User invalid.
   *       403:
   *         description: User not verified.
   */
    // CompanyType
    app.post('/api/companyTypes', [requireUser, validateResource(createCompanyTypeSchema)], createCompanyTypeHandler);
    app.put('/api/companyTypes/:_id', [requireUser, validateResource(updateCompanyTypeSchema)], updateCompanyTypeHandler);
    app.get('/api/companyTypes/:_id', validateResource(findCompanyTypeSchema), findCompanyTypeHandler);
    app.get('/api/companyTypes/', validateResource(findAllCompanyTypeSchema), findAllCompanyTypeHandler);
    app.delete('/api/companyTypes/:_id', [requireUser, validateResource(deleteCompanyTypeSchema)], deleteCompanyTypeHandler);

  /**
   * @openapi
   * '/api/products/{productId}':
   *  get:
   *     tags:
   *     - Products
   *     summary: Get a single product by the productId
   *     parameters:
   *      - name: productId
   *        in: path
   *        description: The id of the product
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schema/Product'
   *       404:
   *         description: Product not found
   */
    // Products
    app.post('/api/products', [requireUser, validateResource(createProductSchema)], createProductHandler);
    app.put('/api/products/:productId', [requireUser, validateResource(updateProductSchema)], updateProductHandler);
    app.get('/api/products/:productId', validateResource(findProductSchema), findProductHandler);
    app.get('/api/products/', validateResource(findAllProductSchema), findAllProductHandler);
    app.delete('/api/products/:productId', [requireUser, validateResource(deleteProductSchema)], deleteProductHandler);

    /**
   * @openapi
   * '/api/sessions':
   *  post:
   *     tags:
   *     - Session
   *     summary: Create a session by logging in.
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateSessionInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateSessionResponse'
   *      404:
   *        description: User not found.
   *  get:
   *     tags:
   *     - Session
   *     summary: Find session of the user logging in.
   *     description: Return sessions of the logged in user.
   *     responses:
   *       200:
   *         description: Session info.
   *       403:
   *         description: User not logged in.
   * 
   *  delete:
   *     tags:
   *     - Session
   *     summary: Anull the session of the user by logging out.
   *     description: Inactive the actual session of the logged in user.
   *     responses:
   *       200:
   *         description: Access and Refresh token as null.
   * '/api/sessions/oauth/google':
   *  get:
   *     tags:
   *     - Session
   *     summary: Create a session by using google account.
   *     description: Return sessions of the logged in user.
   *     responses:
   *       200:
   *         description: Redirect to main page with a valid session.
   *       401:
   *         description: User invalid.
   *       403:
   *         description: User not verified.
   */
    // Reports
    app.post('/api/reports', [requireUser, validateResource(createReportSchema)], createReportHandler);
    app.put('/api/reports/:_id', [requireUser, validateResource(updateReportSchema)], updateReportHandler);
    app.get('/api/reports/:_id', validateResource(findReportSchema), findReportHandler);
    app.get('/api/reports/', validateResource(findAllReportSchema), findAllReportHandler);
    app.delete('/api/reports/:_id', [requireUser, validateResource(deleteReportSchema)], deleteReportHandler);

    /**
   * @openapi
   * '/api/sessions':
   *  post:
   *     tags:
   *     - Session
   *     summary: Create a session by logging in.
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateSessionInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateSessionResponse'
   *      404:
   *        description: User not found.
   *  get:
   *     tags:
   *     - Session
   *     summary: Find session of the user logging in.
   *     description: Return sessions of the logged in user.
   *     responses:
   *       200:
   *         description: Session info.
   *       403:
   *         description: User not logged in.
   * 
   *  delete:
   *     tags:
   *     - Session
   *     summary: Anull the session of the user by logging out.
   *     description: Inactive the actual session of the logged in user.
   *     responses:
   *       200:
   *         description: Access and Refresh token as null.
   * '/api/sessions/oauth/google':
   *  get:
   *     tags:
   *     - Session
   *     summary: Create a session by using google account.
   *     description: Return sessions of the logged in user.
   *     responses:
   *       200:
   *         description: Redirect to main page with a valid session.
   *       401:
   *         description: User invalid.
   *       403:
   *         description: User not verified.
   */
    // Reports
    app.post('/api/reportGroups', [requireUser, validateResource(createReportGroupsSchema)], createReportGroupsHandler);
    app.put('/api/reportGroups/:_id', [requireUser, validateResource(updateReportGroupsSchema)], updateReportGroupsHandler);
    app.get('/api/reportGroups/:_id', validateResource(findReportGroupsSchema), findReportGroupsHandler);
    app.get('/api/reportGroups/', validateResource(findAllReportGroupsSchema), findAllReportGroupsHandler);
    app.delete('/api/reportGroups/:_id', [requireUser, validateResource(deleteReportGroupsSchema)], deleteReportGroupsHandler);


    // Menus
    app.post('/api/menu', [requireUser, validateResource(createMenuSchema)], createMenuHandler);
    app.put('/api/menu/:_id', [requireUser, validateResource(updateMenuSchema)], updateMenuHandler);
    app.get('/api/menu/:_id', validateResource(findMenuSchema), findMenuHandler);
    app.get('/api/menu/', validateResource(findAllMenuSchema), findAllMenuHandler);
    app.delete('/api/menu/:_id', [requireUser, validateResource(deleteMenuSchema)], deleteMenuHandler);


    // MenuGroups
    app.post('/api/menuGroups', [requireUser, validateResource(createMenuGroupsSchema)], createMenuGroupsHandler);
    app.put('/api/menuGroups/:_id', [requireUser, validateResource(updateMenuGroupsSchema)], updateMenuGroupsHandler);
    app.get('/api/menuGroups/:_id', validateResource(findMenuGroupsSchema), findMenuGroupsHandler);
    app.get('/api/menuGroups/', validateResource(findAllMenuGroupsSchema), findAllMenuGroupsHandler);
    app.delete('/api/menuGroups/:_id', [requireUser, validateResource(deleteMenuGroupsSchema)], deleteMenuGroupsHandler);


    // Pages
    app.post('/api/page', [requireUser, validateResource(createPageSchema)], createPageHandler);
    app.put('/api/page/:_id', [requireUser, validateResource(updatePageSchema)], updatePageHandler);
    app.get('/api/page/:_id', validateResource(findPageSchema), findPageHandler);
    app.get('/api/page/', validateResource(findAllPageSchema), findAllPageHandler);
    app.delete('/api/page/:_id', [requireUser, validateResource(deletePageSchema)], deletePageHandler);


    // PowerBI Embedded
    app.post('/api/getembedinfo', requireUser, getEmbeddedInfoHandler);

    /**
   * @openapi
   * '/api/c4m/auth':
   *  get:
   *     tags:
   *     - Script
   *     summary: Create a token and nonce at C4M API and return them.
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/GetC4mAuthInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/C4mAuthReturn'
   *      400:
   *        description: Script not found.
   */
    // C4M
    app.post('/api/c4m/auth', [requireUser, validateResource(getC4mAuthSchema)], getC4mAuthHandler);
}

export default routes