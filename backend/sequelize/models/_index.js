const User = require('./user.model');
const Group = require('./group.model');
const ContentType = require('./contentType.model');
const Content = require('./content.model');
const Genre = require('./genre.model');
const StatusType = require('./statusType.model');
const Service = require('./service.model');
const ContentStatus = require('./contentStatus.model');
const SeriesEpisode = require('./seriesEpisode.model');

const models = [User, Group, ContentType, Content, Genre, StatusType, ContentStatus, Service, SeriesEpisode];

module.exports = models;
