const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated } = require('../modules/authentication-middleware');

// Route to get all user information and the boxes they have previously created
router.get('/', rejectUnauthenticated, (req, res) => {
    const userId = req.user.id;

    const queryText = `
        SELECT
            u.id as user_id, u.first_name, u.last_name, u.birthday, u.created_at as user_created_at,
            mb.id as box_id, mb.delivery_date, mb.collaborator_note, mb.created_at as box_created_at,
            mb.recipient_name, mb.recipient_email, br.media_url as box_ribbon_media_url
        FROM "user" u
        LEFT JOIN memento_box mb ON u.id = mb.user_id
        LEFT JOIN box_ribbon br ON mb.box_ribbon_id = br.id
        WHERE u.id = $1;
    `;

    pool.query(queryText, [userId])
        .then(result => {
            if (result.rows.length === 0) {
                return res.status(404).send('User not found');
            } else {

                const userInfo = {
                    user_id: result.rows[0].user_id,
                    first_name: result.rows[0].first_name,
                    last_name: result.rows[0].last_name,
                    email: result.rows[0].email,
                    birthday: result.rows[0].birthday,
                    user_created_at: result.rows[0].user_created_at,
                    boxes: []
                };
                result.rows.forEach(row => {
                    if (row.box_id) {
                        userInfo.boxes.push({
                            box_id: row.box_id,
                            box_color: row.box_color,
                            delivery_date: row.delivery_date,
                            collaborator_note: row.collaborator_note,
                            box_created_at: row.box_created_at,
                            recipient_name: row.recipient_name,
                            recipient_email: row.recipient_email,
                            box_ribbon_media_url: row.box_ribbon_media_url
                        });
                    }
                });
                res.sendStatus(200).json(userInfo);
           }
        })
        .catch(err => {
            console.error('Error executing user info GET query', err);
            res.sendStatus(500).send('Server error');
        });
});

// GET route for account info page
router.get('/acct', rejectUnauthenticated, (req, res) => {

    const sqlText = `
        SELECT
            u.id as user_id, u.username, u.first_name, u.last_name, u.birthday, u.created_at as user_created_at,
            mb.id as box_id, mb.delivery_date, mb.collaborator_note, mb.created_at as box_created_at,
            mb.recipient_name, mb.recipient_email, br.media_url as box_ribbon_media_url
        FROM "user" u
        LEFT JOIN memento_box mb ON u.id = mb.user_id
        LEFT JOIN box_ribbon br ON mb.box_ribbon_id = br.id
        WHERE u.id = $1;
    `;

    pool.query(sqlText, [req.user.id]).then(result => {
        console.log('Get Result:', result.rows);
        res.send(result.rows);
    }).catch(error => {
        console.log('Error:', error);
        res.sendStatus(500);
    })
})


module.exports = router;
