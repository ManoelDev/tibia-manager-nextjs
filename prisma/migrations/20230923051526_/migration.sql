-- CreateTable
CREATE TABLE `account_ban_history` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `account_id` INTEGER NOT NULL,
    `reason` VARCHAR(255) NOT NULL,
    `banned_at` BIGINT NOT NULL,
    `expired_at` BIGINT NOT NULL,
    `banned_by` INTEGER NOT NULL,

    INDEX `account_id`(`account_id`),
    INDEX `account_id_2`(`account_id`),
    INDEX `account_id_3`(`account_id`),
    INDEX `account_id_4`(`account_id`),
    INDEX `account_id_5`(`account_id`),
    INDEX `account_id_6`(`account_id`),
    INDEX `account_id_7`(`account_id`),
    INDEX `banned_by`(`banned_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account_bans` (
    `account_id` INTEGER NOT NULL,
    `reason` VARCHAR(255) NOT NULL,
    `banned_at` BIGINT NOT NULL,
    `expires_at` BIGINT NOT NULL,
    `banned_by` INTEGER NOT NULL,

    INDEX `banned_by`(`banned_by`),
    PRIMARY KEY (`account_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account_credentials` (
    `id_credential` INTEGER NOT NULL AUTO_INCREMENT,
    `account_id` INTEGER NOT NULL,
    `key` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `account_id_UNIQUE`(`account_id`),
    INDEX `fk_accountCredential_idx`(`account_id`),
    PRIMARY KEY (`id_credential`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account_viplist` (
    `account_id` INTEGER NOT NULL,
    `player_id` INTEGER NOT NULL,
    `description` VARCHAR(128) NOT NULL DEFAULT '',
    `icon` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `notify` BOOLEAN NOT NULL DEFAULT false,

    INDEX `account_id`(`account_id`),
    INDEX `player_id`(`player_id`),
    UNIQUE INDEX `account_player_index`(`account_id`, `player_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accounts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(32) NOT NULL,
    `password` CHAR(40) NOT NULL,
    `secret` CHAR(16) NULL,
    `gamesecret` VARCHAR(255) NULL,
    `type` INTEGER NOT NULL DEFAULT 1,
    `premdays` INTEGER NOT NULL DEFAULT 0,
    `coins` INTEGER NOT NULL DEFAULT 0,
    `transferable_coins` INTEGER NOT NULL DEFAULT 0,
    `lastday` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `proxy_id` INTEGER NOT NULL DEFAULT 0,
    `email` VARCHAR(255) NOT NULL DEFAULT '',
    `creation` BIGINT NOT NULL DEFAULT 0,
    `vote` INTEGER NOT NULL DEFAULT 0,
    `key` VARCHAR(20) NULL,
    `email_new` VARCHAR(255) NOT NULL DEFAULT '',
    `email_new_time` INTEGER NOT NULL DEFAULT 0,
    `rlname` VARCHAR(255) NOT NULL DEFAULT '',
    `location` VARCHAR(255) NOT NULL DEFAULT '',
    `page_access` INTEGER NOT NULL DEFAULT 0,
    `email_code` VARCHAR(255) NOT NULL DEFAULT '',
    `next_email` INTEGER NOT NULL DEFAULT 0,
    `premium_points` INTEGER NOT NULL DEFAULT 0,
    `create_date` BIGINT NOT NULL DEFAULT 0,
    `create_ip` BIGINT NOT NULL DEFAULT 0,
    `last_post` INTEGER NOT NULL DEFAULT 0,
    `flag` VARCHAR(80) NOT NULL DEFAULT '',
    `vip_time` INTEGER NOT NULL DEFAULT 0,
    `guild_points` INTEGER NOT NULL DEFAULT 0,
    `guild_points_stats` INTEGER NOT NULL DEFAULT 0,
    `passed` INTEGER NOT NULL DEFAULT 0,
    `block` INTEGER NOT NULL DEFAULT 0,
    `refresh` INTEGER NOT NULL DEFAULT 0,
    `birth_date` VARCHAR(50) NOT NULL DEFAULT '',
    `gender` VARCHAR(20) NOT NULL DEFAULT '',
    `loyalty_points` BIGINT NOT NULL DEFAULT 0,
    `authToken` VARCHAR(100) NOT NULL DEFAULT '',
    `player_sell_bank` INTEGER NULL DEFAULT 0,
    `secret_status` BOOLEAN NOT NULL DEFAULT false,
    `tournamentBalance` INTEGER NOT NULL DEFAULT 0,
    `tournamentBalanceElysium` INTEGER NOT NULL DEFAULT 0,
    `created` INTEGER NOT NULL DEFAULT 0,
    `country` VARCHAR(3) NOT NULL DEFAULT '',
    `web_lastlogin` INTEGER NOT NULL DEFAULT 0,
    `web_flags` INTEGER NOT NULL DEFAULT 0,
    `email_hash` VARCHAR(32) NOT NULL DEFAULT '',
    `email_verified` BOOLEAN NOT NULL DEFAULT false,
    `email_next` INTEGER NOT NULL DEFAULT 0,
    `blocked` BOOLEAN NOT NULL DEFAULT false,
    `storages` LONGBLOB NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accounts_options` (
    `account_id` INTEGER NOT NULL,
    `options` TEXT NOT NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accounts_storage` (
    `account_id` INTEGER NOT NULL DEFAULT 0,
    `key` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `value` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`account_id`, `key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `announcements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `text` VARCHAR(255) NOT NULL,
    `date` VARCHAR(20) NOT NULL,
    `author` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blessings_history` (
    `id` INTEGER NOT NULL,
    `player_id` INTEGER NOT NULL,
    `blessing` TINYINT NOT NULL,
    `loss` BOOLEAN NOT NULL,
    `timestamp` INTEGER NOT NULL,

    INDEX `blessings_history_ibfk_1`(`player_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `character_market` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `world_id` INTEGER NOT NULL DEFAULT 1,
    `name` VARCHAR(40) NOT NULL,
    `level` INTEGER NOT NULL,
    `vocation` TINYINT NOT NULL DEFAULT 1,
    `price` INTEGER NOT NULL,
    `player_id` INTEGER NOT NULL,
    `account_id` INTEGER NOT NULL,
    `status` TINYINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `daily_reward_history` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `streak` SMALLINT NOT NULL DEFAULT 0,
    `player_id` INTEGER NOT NULL,
    `time` BIGINT NOT NULL,
    `event` VARCHAR(255) NULL,
    `instant` TINYINT UNSIGNED NOT NULL DEFAULT 0,

    INDEX `player_id`(`player_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `forge_history` (
    `player_id` INTEGER NOT NULL,
    `timestamp` INTEGER NOT NULL,
    `action` TINYINT NOT NULL,
    `message` VARCHAR(255) NOT NULL,
    `error` TINYINT NOT NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `global_storage` (
    `key` VARCHAR(32) NOT NULL,
    `value` TEXT NOT NULL,

    UNIQUE INDEX `key`(`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guild_actions_h` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `guild_id` INTEGER NULL,
    `player_id` INTEGER NOT NULL,
    `value` INTEGER NOT NULL,
    `date` BIGINT NULL,
    `type` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guild_invites` (
    `player_id` INTEGER NOT NULL DEFAULT 0,
    `guild_id` INTEGER NOT NULL DEFAULT 0,
    `date` INTEGER NOT NULL,

    INDEX `guild_id`(`guild_id`),
    PRIMARY KEY (`player_id`, `guild_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guild_membership` (
    `player_id` INTEGER NOT NULL,
    `guild_id` INTEGER NOT NULL,
    `rank_id` INTEGER NOT NULL,
    `nick` VARCHAR(15) NOT NULL DEFAULT '',

    INDEX `guild_id`(`guild_id`),
    INDEX `rank_id`(`rank_id`),
    PRIMARY KEY (`player_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guild_ranks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `guild_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `level` INTEGER NOT NULL,

    INDEX `guild_id`(`guild_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guild_transfer_h` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `player_id` INTEGER NOT NULL,
    `from_guild_id` INTEGER NOT NULL,
    `to_guild_id` INTEGER NOT NULL,
    `value` INTEGER NOT NULL,
    `date` BIGINT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guild_wars` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `world_id` INTEGER NULL DEFAULT 1,
    `guild1` INTEGER NOT NULL DEFAULT 0,
    `guild2` INTEGER NOT NULL DEFAULT 0,
    `name1` VARCHAR(255) NOT NULL,
    `name2` VARCHAR(255) NOT NULL,
    `status` TINYINT NOT NULL DEFAULT 0,
    `started` BIGINT NOT NULL DEFAULT 0,
    `ended` BIGINT NOT NULL DEFAULT 0,
    `frags_limit` INTEGER NULL DEFAULT 100,
    `duration` BIGINT NOT NULL DEFAULT 0,
    `kills` BIGINT NOT NULL DEFAULT 0,
    `price` BIGINT NOT NULL DEFAULT 0,

    INDEX `guild1`(`guild1`),
    INDEX `guild2`(`guild2`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guilds` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `world_id` INTEGER NULL DEFAULT 1,
    `name` VARCHAR(255) NOT NULL,
    `ownerid` INTEGER NOT NULL,
    `creationdata` BIGINT NOT NULL,
    `motd` VARCHAR(255) NOT NULL DEFAULT '',
    `description` MEDIUMTEXT NOT NULL,
    `guild_logo` MEDIUMBLOB NULL,
    `create_ip` BIGINT NOT NULL DEFAULT 0,
    `balance` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `last_execute_points` BIGINT NOT NULL DEFAULT 0,
    `logo_name` VARCHAR(255) NOT NULL DEFAULT 'default.gif',
    `level` INTEGER NULL DEFAULT 1,
    `points` INTEGER NULL DEFAULT 0,
    `streak` SMALLINT NULL DEFAULT 1,
    `residence` INTEGER NOT NULL DEFAULT 0,
    `war_stage` TINYINT NOT NULL DEFAULT 0,
    `war_frags` INTEGER NOT NULL DEFAULT 0,
    `war_enemy` INTEGER NULL DEFAULT 0,
    `guild_bonus` BIGINT NOT NULL DEFAULT 0,

    UNIQUE INDEX `name`(`name`),
    UNIQUE INDEX `ownerid`(`ownerid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guildwar_kills` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `world_id` INTEGER NULL DEFAULT 1,
    `killer` VARCHAR(50) NOT NULL,
    `target` VARCHAR(50) NOT NULL,
    `killerguild` INTEGER NOT NULL DEFAULT 0,
    `targetguild` INTEGER NOT NULL DEFAULT 0,
    `warid` INTEGER NOT NULL DEFAULT 0,
    `time` BIGINT NOT NULL,

    INDEX `warid`(`warid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `highscores` (
    `id` TINYINT NOT NULL,
    `name` TINYINT NOT NULL,
    `account_id` TINYINT NOT NULL,
    `group_id` TINYINT NOT NULL,
    `level` TINYINT NOT NULL,
    `experience` TINYINT NOT NULL,
    `vocation` TINYINT NOT NULL,
    `rank` TINYINT NOT NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hirelings` (
    `world_id` TINYINT NOT NULL DEFAULT 1,
    `hireling_id` INTEGER NOT NULL AUTO_INCREMENT,
    `owner_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `active` TINYINT NOT NULL,
    `sex` TINYINT NOT NULL,
    `direction` TINYINT NOT NULL DEFAULT 0,
    `pos_x` INTEGER NOT NULL,
    `pos_y` INTEGER NOT NULL,
    `pos_z` INTEGER NOT NULL,
    `looktype` INTEGER NOT NULL,
    `lookhead` INTEGER NOT NULL,
    `lookbody` INTEGER NOT NULL,
    `looklegs` INTEGER NOT NULL,
    `lookfeet` INTEGER NOT NULL,
    `skills` BLOB NULL,

    PRIMARY KEY (`hireling_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `house_lists` (
    `house_id` INTEGER NOT NULL,
    `listid` INTEGER NOT NULL,
    `list` MEDIUMTEXT NOT NULL,
    `world_id` INTEGER NOT NULL DEFAULT 1,

    INDEX `house_id`(`house_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `houses` (
    `id` INTEGER NOT NULL,
    `world_id` INTEGER NOT NULL DEFAULT 1,
    `owner` INTEGER NOT NULL,
    `owner_account` INTEGER NOT NULL DEFAULT 0,
    `state` TINYINT NOT NULL DEFAULT 0,
    `paid` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `warnings` INTEGER NOT NULL DEFAULT 0,
    `name` VARCHAR(255) NOT NULL,
    `rent` INTEGER NOT NULL DEFAULT 0,
    `town_id` INTEGER NOT NULL DEFAULT 0,
    `internal_bid` INTEGER NOT NULL DEFAULT 0,
    `bid_end` INTEGER NOT NULL DEFAULT 0,
    `holder_limit` INTEGER NOT NULL DEFAULT 0,
    `highest_bid` INTEGER NOT NULL DEFAULT 0,
    `bidder_name` VARCHAR(255) NULL,
    `size` INTEGER NOT NULL DEFAULT 0,
    `guildid` INTEGER NULL,
    `beds` INTEGER NOT NULL DEFAULT 0,

    INDEX `owner`(`owner`),
    INDEX `town_id`(`town_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ip_bans` (
    `ip` INTEGER UNSIGNED NOT NULL,
    `reason` VARCHAR(255) NOT NULL,
    `banned_at` BIGINT NOT NULL,
    `expires_at` BIGINT NOT NULL,
    `banned_by` INTEGER NOT NULL,

    INDEX `banned_by`(`banned_by`),
    PRIMARY KEY (`ip`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `live_casts` (
    `player_id` INTEGER NOT NULL,
    `cast_name` VARCHAR(255) NOT NULL,
    `password` BOOLEAN NOT NULL DEFAULT false,
    `description` VARCHAR(255) NULL,
    `spectators` SMALLINT NULL DEFAULT 0,
    `version` INTEGER NULL DEFAULT 1220,

    UNIQUE INDEX `player_id_2`(`player_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `market_history` (
    `world_id` TINYINT NOT NULL DEFAULT 1,
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `player_id` INTEGER NOT NULL,
    `sale` BOOLEAN NOT NULL DEFAULT false,
    `itemtype` INTEGER UNSIGNED NOT NULL,
    `tier` TINYINT NULL DEFAULT 0,
    `amount` SMALLINT UNSIGNED NOT NULL,
    `price` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `expires_at` BIGINT UNSIGNED NOT NULL,
    `inserted` BIGINT UNSIGNED NOT NULL,
    `state` TINYINT UNSIGNED NOT NULL,

    INDEX `player_id`(`player_id`, `sale`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `market_offers` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `tier` TINYINT NULL DEFAULT 0,
    `player_id` INTEGER NOT NULL,
    `sale` BOOLEAN NOT NULL DEFAULT false,
    `itemtype` INTEGER UNSIGNED NOT NULL,
    `amount` SMALLINT UNSIGNED NOT NULL,
    `created` BIGINT UNSIGNED NOT NULL,
    `anonymous` BOOLEAN NOT NULL DEFAULT false,
    `price` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `world_id` INTEGER NOT NULL DEFAULT 1,

    INDEX `created`(`created`),
    INDEX `player_id`(`player_id`),
    INDEX `sale`(`sale`, `itemtype`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments_recovered` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `account_id` INTEGER NOT NULL,
    `cod` VARCHAR(1000) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_binary_items` (
    `player_id` INTEGER NOT NULL,
    `type` INTEGER NOT NULL,
    `items` LONGBLOB NOT NULL,

    UNIQUE INDEX `player_id_2`(`player_id`, `type`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_deaths` (
    `player_id` INTEGER NOT NULL,
    `time` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `level` INTEGER NOT NULL DEFAULT 1,
    `killed_by` VARCHAR(255) NOT NULL,
    `is_player` BOOLEAN NOT NULL DEFAULT true,
    `mostdamage_by` VARCHAR(100) NOT NULL,
    `mostdamage_is_player` BOOLEAN NOT NULL DEFAULT false,
    `unjustified` BOOLEAN NOT NULL DEFAULT false,
    `mostdamage_unjustified` BOOLEAN NOT NULL DEFAULT false,
    `killer_id` INTEGER NOT NULL DEFAULT 0,
    `id` INTEGER NOT NULL DEFAULT 0,
    `date` INTEGER NULL DEFAULT 0,

    INDEX `killed_by`(`killed_by`),
    INDEX `mostdamage_by`(`mostdamage_by`),
    INDEX `player_id`(`player_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_former_names` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `player_id` INTEGER NOT NULL,
    `former_name` VARCHAR(35) NOT NULL,
    `date` INTEGER NOT NULL,

    INDEX `player_id`(`player_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_hirelings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `player_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NULL,
    `active` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `sex` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `posx` INTEGER NOT NULL DEFAULT 0,
    `posy` INTEGER NOT NULL DEFAULT 0,
    `posz` INTEGER NOT NULL DEFAULT 0,
    `lookbody` INTEGER NOT NULL DEFAULT 0,
    `lookfeet` INTEGER NOT NULL DEFAULT 0,
    `lookhead` INTEGER NOT NULL DEFAULT 0,
    `looklegs` INTEGER NOT NULL DEFAULT 0,
    `looktype` INTEGER NOT NULL DEFAULT 136,

    INDEX `player_id`(`player_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_items` (
    `player_id` INTEGER NOT NULL DEFAULT 0,
    `pid` INTEGER NOT NULL DEFAULT 0,
    `sid` INTEGER NOT NULL DEFAULT 0,
    `itemtype` INTEGER NOT NULL DEFAULT 0,
    `count` INTEGER NOT NULL DEFAULT 0,
    `attributes` BLOB NOT NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_killers` (
    `kill_id` INTEGER NOT NULL,
    `player_id` INTEGER NOT NULL,

    INDEX `kill_id`(`kill_id`),
    INDEX `player_id`(`player_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_kills` (
    `player_id` INTEGER NOT NULL,
    `time` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `target` INTEGER NOT NULL,
    `unavenged` BOOLEAN NOT NULL DEFAULT false,

    INDEX `player_kills_ibfk_1`(`player_id`),
    INDEX `player_kills_ibfk_2`(`target`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_misc` (
    `player_id` INTEGER NOT NULL,
    `info` BLOB NOT NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_namelocks` (
    `player_id` INTEGER NOT NULL,
    `reason` VARCHAR(255) NOT NULL,
    `namelocked_at` BIGINT NOT NULL,
    `namelocked_by` INTEGER NOT NULL,

    INDEX `namelocked_by`(`namelocked_by`),
    PRIMARY KEY (`player_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_prey` (
    `player_id` INTEGER NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `mindex` SMALLINT NOT NULL,
    `mcolumn` INTEGER NOT NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_preydata` (
    `player_id` INTEGER NOT NULL,
    `data` BLOB NOT NULL,

    PRIMARY KEY (`player_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_preytimes` (
    `player_id` INTEGER NOT NULL,
    `bonus_type1` INTEGER NOT NULL,
    `bonus_value1` INTEGER NOT NULL,
    `bonus_name1` VARCHAR(50) NOT NULL,
    `bonus_type2` INTEGER NOT NULL,
    `bonus_value2` INTEGER NOT NULL,
    `bonus_name2` VARCHAR(50) NOT NULL,
    `bonus_type3` INTEGER NOT NULL,
    `bonus_value3` INTEGER NOT NULL,
    `bonus_name3` VARCHAR(50) NOT NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_rewards` (
    `player_id` INTEGER NOT NULL,
    `sid` INTEGER NOT NULL,
    `pid` INTEGER NOT NULL DEFAULT 0,
    `itemtype` INTEGER NOT NULL DEFAULT 0,
    `count` INTEGER NOT NULL DEFAULT 0,
    `attributes` BLOB NOT NULL,

    UNIQUE INDEX `player_id_2`(`player_id`, `sid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_stash` (
    `player_id` INTEGER NOT NULL,
    `item_id` INTEGER NOT NULL,
    `item_count` INTEGER NOT NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `players` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `group_id` SMALLINT UNSIGNED NOT NULL DEFAULT 1,
    `account_id` INTEGER NOT NULL DEFAULT 0,
    `level` INTEGER UNSIGNED NOT NULL DEFAULT 1,
    `vocation` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    `health` INTEGER NOT NULL DEFAULT 150,
    `healthmax` INTEGER NOT NULL DEFAULT 150,
    `experience` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `exptoday` INTEGER NULL,
    `lookbody` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `lookfeet` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `lookhead` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `looklegs` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `looktype` SMALLINT UNSIGNED NOT NULL DEFAULT 136,
    `lookaddons` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `maglevel` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `mana` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `manamax` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `manaspent` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `soul` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `town_id` INTEGER UNSIGNED NOT NULL DEFAULT 1,
    `posx` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    `posy` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    `posz` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `conditions` BLOB NULL,
    `cap` INTEGER UNSIGNED NOT NULL DEFAULT 400,
    `sex` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `lastlogin` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `lastip` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `save` BOOLEAN NOT NULL DEFAULT true,
    `skull` BOOLEAN NOT NULL DEFAULT false,
    `skulltime` BIGINT NOT NULL DEFAULT 0,
    `lastlogout` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `blessings` TINYINT NOT NULL DEFAULT 0,
    `blessings1` TINYINT NOT NULL DEFAULT 0,
    `blessings2` TINYINT NOT NULL DEFAULT 0,
    `blessings3` TINYINT NOT NULL DEFAULT 0,
    `blessings4` TINYINT NOT NULL DEFAULT 0,
    `blessings5` TINYINT NOT NULL DEFAULT 0,
    `blessings6` TINYINT NOT NULL DEFAULT 0,
    `blessings7` TINYINT NOT NULL DEFAULT 0,
    `blessings8` TINYINT NOT NULL DEFAULT 0,
    `onlinetime` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `deletion` BIGINT NOT NULL DEFAULT 0,
    `balance` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `bonusrerollcount` BIGINT NULL DEFAULT 0,
    `quick_loot_fallback` BOOLEAN NULL DEFAULT false,
    `offlinetraining_time` SMALLINT UNSIGNED NOT NULL DEFAULT 43200,
    `offlinetraining_skill` INTEGER NOT NULL DEFAULT -1,
    `stamina` SMALLINT UNSIGNED NOT NULL DEFAULT 2520,
    `skill_fist` SMALLINT UNSIGNED NOT NULL DEFAULT 10,
    `skill_fist_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_club` SMALLINT UNSIGNED NOT NULL DEFAULT 10,
    `skill_club_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_sword` SMALLINT UNSIGNED NOT NULL DEFAULT 10,
    `skill_sword_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_axe` SMALLINT UNSIGNED NOT NULL DEFAULT 10,
    `skill_axe_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_dist` SMALLINT UNSIGNED NOT NULL DEFAULT 10,
    `skill_dist_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_shielding` SMALLINT UNSIGNED NOT NULL DEFAULT 10,
    `skill_shielding_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_fishing` SMALLINT UNSIGNED NOT NULL DEFAULT 10,
    `skill_fishing_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `description` VARCHAR(255) NOT NULL DEFAULT '',
    `comment` MEDIUMTEXT NOT NULL,
    `create_ip` BIGINT NOT NULL DEFAULT 0,
    `create_date` BIGINT NOT NULL DEFAULT 0,
    `hide_char` INTEGER NOT NULL DEFAULT 0,
    `skill_critical_hit_chance` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `skill_critical_hit_chance_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_critical_hit_damage` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `skill_critical_hit_damage_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_life_leech_chance` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `skill_life_leech_chance_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_life_leech_amount` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `skill_life_leech_amount_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_mana_leech_chance` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `skill_mana_leech_chance_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_mana_leech_amount` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `skill_mana_leech_amount_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_criticalhit_chance` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_criticalhit_damage` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_lifeleech_chance` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_lifeleech_amount` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_manaleech_chance` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_manaleech_amount` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `prey_stamina_1` INTEGER NULL,
    `prey_stamina_2` INTEGER NULL,
    `prey_stamina_3` INTEGER NULL,
    `prey_column` SMALLINT NOT NULL DEFAULT 1,
    `xpboost_stamina` INTEGER NULL,
    `xpboost_value` INTEGER NULL,
    `marriage_status` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `hide_skills` INTEGER NULL,
    `hide_set` INTEGER NULL,
    `former` VARCHAR(255) NOT NULL DEFAULT '-',
    `signature` VARCHAR(255) NOT NULL DEFAULT '',
    `marriage_spouse` INTEGER NOT NULL DEFAULT -1,
    `loyalty_ranking` BOOLEAN NOT NULL DEFAULT false,
    `bonus_rerolls` BIGINT NOT NULL DEFAULT 0,
    `critical` INTEGER NULL DEFAULT 0,
    `bonus_reroll` INTEGER NOT NULL DEFAULT 0,
    `sbw_points` INTEGER NOT NULL DEFAULT 0,
    `instantrewardtokens` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `charmpoints` INTEGER NULL DEFAULT 0,
    `direction` TINYINT UNSIGNED NOT NULL DEFAULT 2,
    `lookmount` INTEGER NULL DEFAULT 0,
    `version` INTEGER NULL DEFAULT 1000,
    `lootaction` TINYINT NULL DEFAULT 0,
    `spells` BLOB NULL,
    `storages` MEDIUMBLOB NULL,
    `items` LONGBLOB NULL,
    `depotitems` LONGBLOB NULL,
    `inboxitems` LONGBLOB NULL,
    `rewards` LONGBLOB NULL,
    `varcap` INTEGER NOT NULL DEFAULT 0,
    `charmExpansion` TINYINT NULL DEFAULT 0,
    `bestiarykills` LONGBLOB NULL,
    `bosstiarydata` LONGBLOB NULL,
    `bosstiarykills` LONGBLOB NULL,
    `bosstiaryslot` LONGBLOB NULL,
    `bosscooldown` LONGBLOB NULL,
    `bossremovecount` INTEGER NOT NULL DEFAULT 0,
    `charms` LONGBLOB NULL,
    `bestiaryTracker` LONGBLOB NULL,
    `autoloot` BLOB NULL,
    `lastday` BIGINT NULL DEFAULT 0,
    `global_storage` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `hide_char_items` BOOLEAN NOT NULL DEFAULT false,
    `cast` BOOLEAN NOT NULL DEFAULT false,
    `border_id` INTEGER NULL,
    `depotlockeritems` LONGBLOB NULL,
    `supplystash` LONGBLOB NULL,
    `hunting_points` INTEGER NOT NULL DEFAULT 0,
    `rewardchest_items` LONGBLOB NULL,
    `huntingExpansion` TINYINT NOT NULL DEFAULT 0,
    `xpboost_store` TINYINT NOT NULL DEFAULT 0,
    `xpboost_count` TINYINT NOT NULL DEFAULT 0,
    `store_regen` BIGINT NOT NULL DEFAULT 0,
    `lookmountbody` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `lookmountfeet` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `lookmounthead` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `lookmountlegs` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `hireling_count` INTEGER NOT NULL DEFAULT 0,
    `hireling_wardrobe` BLOB NULL,
    `hireling_skills` BLOB NULL,
    `lookfamiliarstype` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `manashield` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    `max_manashield` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    `gpoints` BIGINT NULL DEFAULT 0,
    `world_id` INTEGER NOT NULL DEFAULT 1,
    `created` INTEGER NOT NULL DEFAULT 0,
    `hidden` BOOLEAN NOT NULL DEFAULT false,
    `familiar_remaintime` INTEGER NOT NULL DEFAULT 0,
    `exalted_dust` INTEGER NOT NULL DEFAULT 0,
    `max_exalted_dust` INTEGER NOT NULL DEFAULT 0,
    `loyalt_store` INTEGER NOT NULL DEFAULT 0,
    `cast_on` TINYINT NOT NULL DEFAULT 0,
    `exercise_delay` INTEGER NOT NULL DEFAULT 0,
    `frags` INTEGER NOT NULL DEFAULT 0,
    `deaths` INTEGER NOT NULL DEFAULT 0,
    `last_transfer` INTEGER NOT NULL DEFAULT 0,
    `bosstracker` BLOB NULL,

    UNIQUE INDEX `name`(`name`),
    INDEX `account_id`(`account_id`),
    INDEX `vocation`(`vocation`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `players_online` (
    `world_id` TINYINT NOT NULL DEFAULT 1,
    `player_id` INTEGER NOT NULL,

    PRIMARY KEY (`player_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prey_slots` (
    `player_id` INTEGER NOT NULL,
    `num` SMALLINT NOT NULL,
    `state` SMALLINT NOT NULL DEFAULT 1,
    `unlocked` BOOLEAN NOT NULL DEFAULT false,
    `current` VARCHAR(40) NOT NULL DEFAULT '',
    `monster_list` VARCHAR(360) NOT NULL,
    `free_reroll_in` INTEGER NOT NULL DEFAULT 0,
    `time_left` SMALLINT NOT NULL DEFAULT 0,
    `next_use` INTEGER NOT NULL DEFAULT 0,
    `bonus_type` SMALLINT NOT NULL,
    `bonus_value` SMALLINT NOT NULL DEFAULT 0,
    `bonus_grade` SMALLINT NOT NULL DEFAULT 0,

    INDEX `player_id`(`player_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prey_task` (
    `player_id` INTEGER NOT NULL,
    `slot` INTEGER NOT NULL,
    `unlocked` TINYINT NOT NULL DEFAULT 0,
    `state` INTEGER NOT NULL DEFAULT 0,
    `lock_state` INTEGER NOT NULL DEFAULT 0,
    `creature` INTEGER NOT NULL DEFAULT 0,
    `creature_list` VARCHAR(360) NOT NULL,
    `count` INTEGER NOT NULL DEFAULT 0,
    `kill_counter` INTEGER NOT NULL DEFAULT 0,
    `reward_type` INTEGER NOT NULL DEFAULT 0,
    `reward_value` INTEGER NOT NULL DEFAULT 0,
    `reward_grade` INTEGER NOT NULL DEFAULT 0,
    `next_reroll` INTEGER NOT NULL DEFAULT 0
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `s_attributes` (
    `item_id` INTEGER NOT NULL,
    `attack` VARCHAR(11) NULL,
    `armor` VARCHAR(11) NULL,
    `defense` VARCHAR(11) NULL,
    `extraDef` VARCHAR(4) NULL,
    `range` VARCHAR(11) NULL,
    `speed` VARCHAR(4) NULL,
    `elementFire` VARCHAR(11) NULL,
    `elementIce` VARCHAR(11) NULL,
    `elementEarth` VARCHAR(11) NULL,
    `elementEnergy` VARCHAR(11) NULL,
    `skillShield` VARCHAR(4) NULL,
    `skillDist` VARCHAR(4) NULL,
    `skillFist` VARCHAR(4) NULL,
    `skillClub` VARCHAR(4) NULL,
    `skillAxe` VARCHAR(4) NULL,
    `skillSword` VARCHAR(4) NULL,
    `magicLevelPoints` VARCHAR(4) NULL,
    `absorbPercentAll` VARCHAR(3) NULL,
    `absorbPercentFire` VARCHAR(3) NULL,
    `absorbPercentEarth` VARCHAR(3) NULL,
    `absorbPercentEnergy` VARCHAR(3) NULL,
    `absorbPercentIce` VARCHAR(3) NULL,
    `absorbPercentDeath` VARCHAR(3) NULL,
    `absorbPercentHoly` VARCHAR(3) NULL,
    `absorbPercentPhysical` VARCHAR(3) NULL,
    `absorbPercentManaDrain` VARCHAR(3) NULL,
    `absorbPercentLifeDrain` VARCHAR(3) NULL,
    `charges` VARCHAR(11) NULL,
    `duration` VARCHAR(11) NULL,
    `preventDrop` VARCHAR(11) NULL,
    `containerSize` VARCHAR(11) NULL,
    `hitChance` VARCHAR(11) NULL,
    `shootType` VARCHAR(12) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `s_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `descr` TEXT NULL,
    `weight` INTEGER NOT NULL,
    `itemid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `server_config` (
    `config` VARCHAR(50) NOT NULL,
    `value` VARCHAR(256) NOT NULL DEFAULT '',
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `world_id` INTEGER NOT NULL DEFAULT 1
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `store_history` (
    `account_id` INTEGER NOT NULL,
    `mode` BOOLEAN NOT NULL DEFAULT false,
    `amount` INTEGER NOT NULL,
    `coin_type` TINYINT NOT NULL DEFAULT 0,
    `description` VARCHAR(255) NULL,
    `cust` INTEGER NOT NULL,
    `time` BIGINT NULL,

    INDEX `store_history_ibfk_1`(`account_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `store_history_old` (
    `account_id` INTEGER NOT NULL,
    `mode` SMALLINT NOT NULL DEFAULT 0,
    `description` VARCHAR(3500) NOT NULL,
    `coin_amount` INTEGER NOT NULL,
    `time` BIGINT UNSIGNED NOT NULL,
    `timestamp` INTEGER NOT NULL DEFAULT 0,
    `id` INTEGER NOT NULL,
    `coins` INTEGER NOT NULL DEFAULT 0,

    INDEX `account_id`(`account_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tile_store` (
    `world_id` TINYINT NOT NULL DEFAULT 1,
    `house_id` INTEGER NOT NULL,
    `data` LONGBLOB NOT NULL,

    INDEX `house_id`(`house_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `towns` (
    `world_id` TINYINT NOT NULL DEFAULT 1,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `posx` INTEGER NOT NULL DEFAULT 0,
    `posy` INTEGER NOT NULL DEFAULT 0,
    `posz` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `account_ban_history` ADD CONSTRAINT `account_ban_history_ibfk_2` FOREIGN KEY (`banned_by`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `account_ban_history` ADD CONSTRAINT `account_ban_history_ibfk_3` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `account_bans` ADD CONSTRAINT `account_bans_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `account_bans` ADD CONSTRAINT `account_bans_ibfk_2` FOREIGN KEY (`banned_by`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `account_credentials` ADD CONSTRAINT `fk_accountCredential` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `account_viplist` ADD CONSTRAINT `account_viplist_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `account_viplist` ADD CONSTRAINT `account_viplist_ibfk_2` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `accounts_storage` ADD CONSTRAINT `accounts_storage_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `blessings_history` ADD CONSTRAINT `blessings_history_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `guild_invites` ADD CONSTRAINT `guild_invites_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `guild_invites` ADD CONSTRAINT `guild_invites_ibfk_2` FOREIGN KEY (`guild_id`) REFERENCES `guilds`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `guild_membership` ADD CONSTRAINT `guild_membership_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `guild_membership` ADD CONSTRAINT `guild_membership_ibfk_2` FOREIGN KEY (`guild_id`) REFERENCES `guilds`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `guild_membership` ADD CONSTRAINT `guild_membership_ibfk_3` FOREIGN KEY (`rank_id`) REFERENCES `guild_ranks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `guild_ranks` ADD CONSTRAINT `guild_ranks_ibfk_1` FOREIGN KEY (`guild_id`) REFERENCES `guilds`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `guilds` ADD CONSTRAINT `guilds_ibfk_1` FOREIGN KEY (`ownerid`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `guildwar_kills` ADD CONSTRAINT `guildwar_kills_ibfk_1` FOREIGN KEY (`warid`) REFERENCES `guild_wars`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ip_bans` ADD CONSTRAINT `ip_bans_ibfk_1` FOREIGN KEY (`banned_by`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `live_casts` ADD CONSTRAINT `live_casts_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `market_history` ADD CONSTRAINT `market_history_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `market_offers` ADD CONSTRAINT `market_offers_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `player_binary_items` ADD CONSTRAINT `player_binary_items_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `player_deaths` ADD CONSTRAINT `player_deaths_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `player_kills` ADD CONSTRAINT `player_kills_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `player_kills` ADD CONSTRAINT `player_kills_ibfk_2` FOREIGN KEY (`target`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `player_namelocks` ADD CONSTRAINT `player_namelocks_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `player_namelocks` ADD CONSTRAINT `player_namelocks_ibfk_2` FOREIGN KEY (`namelocked_by`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `player_preydata` ADD CONSTRAINT `player_preydata_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `player_rewards` ADD CONSTRAINT `player_rewards_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `players` ADD CONSTRAINT `players_account_fk` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `prey_slots` ADD CONSTRAINT `prey_slots_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `store_history` ADD CONSTRAINT `store_history_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `store_history_old` ADD CONSTRAINT `store_history_old_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
