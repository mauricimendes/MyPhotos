
exports.up = function(knex) {
    return knex.schema.createTable('user', function(user) {
        user.increments('user_id').primary()
        user.string('user_name').notNullable()
        user.string('user_email').notNullable()
        user.string('user_password').notNullable()
        user.string('user_image').notNullable()
        user.string('user_whatsapp').notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('user')
};
