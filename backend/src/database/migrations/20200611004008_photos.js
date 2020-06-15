
exports.up = function(knex) {
    return knex.schema.createTable('photo', function(photo) {
        photo.increments('photo_id').primary()
        photo.string('photo_image').notNullable()
        photo.string('photo_description').notNullable()
        photo.string('photo_topic').notNullable()
        photo.integer('photo_user_id').references('user_id').inTable('user')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('photo')
};
