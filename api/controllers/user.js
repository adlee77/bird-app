import { db } from "../db.js";

export const updateImage = (req, res) => {
    const userId = req.params.id;
    const q = "UPDATE users SET `profile_img`=? WHERE `id` = ?";

    db.query(q, [req.body.img, userId], (err, data) => {
        if (err) return res.status(500).json(err); 
        return res.json("User Profile Image has been updated.");
    });
};

export const getUser = (req, res) => {
    const q =
      "SELECT * FROM users WHERE id = ? ";
  
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
  
      return res.status(200).json(data[0]);
    });
  };

export const getAllUsers = (req, res) => {

    const q = "Select * FROM users";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
    
        return res.status(200).json(data);
      });
}
  