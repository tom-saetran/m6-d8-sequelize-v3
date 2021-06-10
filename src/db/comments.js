export default (sequelize, DataTypes) => {
    const Comment = sequelize.define("comment", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    })
    return Comment
}
