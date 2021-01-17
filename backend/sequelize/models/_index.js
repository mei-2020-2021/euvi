const User = require('./user.model');
const Group = require('./group.model');
const Genre = require('./genre.model');
const Content = require('./content.model');
const Service = require('./service.model');
const StatusType = require('./statusType.model');
const ContentType = require('./contentType.model');
const ContentStatus = require('./contentStatus.model');
const SeriesEpisode = require('./seriesEpisode.model');
const Friendship = require('./friendship.model');
const Recommendation = require('./recommendation.model');
const GroupUsers = require('./groupUsers.model');

const models = [User, Group, ContentType, Content, Genre, StatusType, ContentStatus, Service, SeriesEpisode, Friendship, Recommendation, GroupUsers];

module.exports = models;
