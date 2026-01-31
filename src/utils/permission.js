const rolePermissions = {
    staff: ['GET'],
    admin: ['POST','GET'],
    superadmin: ['GET', 'POST', 'PUT', 'DELETE']
}

export default rolePermissions;