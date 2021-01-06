CREATE TABLE IF NOT EXISTS `products` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `img` varchar(250) NOT NULL,
  `pname` varchar(40) NOT NULL,
  `desc` varchar(100) NOT NULL,
  `price` int(10) NOT NULL,
  `username` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;