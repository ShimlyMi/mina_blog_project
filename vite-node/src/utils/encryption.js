const bcrypt = require('bcryptjs');

export function __bcrypt(data) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data,salt);
}
